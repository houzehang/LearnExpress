'use strict';
let path = require('path');
let fs_util = require(path.join(__dirname, './../utils/fs_util.js'));
let userDao = require('../dao/userDao');
let viewConfig = require('../config/view_config');
let MyRouter = function(app){
	this.app = app;
}

MyRouter.prototype.initAll = function(){
	let app = this.app;
	if (!app) {return}

	////======== 主页 ========
	app.get('/',function(req,res){
		res.render('home');
	});

	////======== 根据视图名称路由 ========
	let viewNameArr = [];
	fs_util.findSync(path.join(__dirname, './../views/')).map(function(item){viewNameArr.push(item.match(/([^<>/\\\|:""\*\?]+\.\w+$)/)[0].replace('.handlebars',''))});
	for(var i = 0,len = viewNameArr.length; i < len; i++){
		let viewName = viewNameArr[i];
		app.get('/'+viewName,function(req,res){
			////======== 需要验证登录的页面 ========
			if (viewConfig.viewsNeedVerifing.indexOf(viewName) > -1 && !req.session.uid) {
				res.render('login',{isLoginOrRegister:true});
			}else{
				res.render(viewName,{uid:req.session.uid,isLoginOrRegister:/^login$|^register$/.test(viewName)});
			}
		});
	};

	////======== 登陆 ========
	app.post('/login',function(req,res){

		var accountname = req.body.accountname;
		var password = req.body.password;
		var userInfo = null;

		function checkExist(keyName){
			return userDao.getUserThroughLogin(keyName,accountname,password).then(function(dbRes){
				if (dbRes && dbRes.length > 0) {
					userInfo = dbRes[0];
				}
			});
		}
		(async function () {
			try{
				let keys = ['username','phone','email'];
				for(let i = 0,len = keys.length; i < len; i++){
					!userInfo && await checkExist(keys[i]);
				}
			}catch(error){
            	let errMsg = error.message || error;
            	console.log('error:_register'+ errMsg);
			}
			console.log('[mylog] ================ login->userInfo ' + JSON.stringify(userInfo));
			res.status(200);
			if (userInfo) {
				req.session.uid = userInfo.id;
				res.send({ok:true});
			}else{
				res.send({ok:false});
			}
		})()
	});

	////======== 退出 ========
	app.post('/exit',function(req,res){
		delete req.session.uid;
		res.send({ok:true});
	});

	////======== 注册 ========
	app.post('/register',function(req,res){
 		
 		var phone = req.body.phone;
        var email = req.body.email;
        var password = req.body.password;
        var username = req.body.username;
        var createTime = Date.now();

		function createUser(){
			return userDao.createUser(username, password, phone, email, createTime).then(function (dbRes) {});
		}

        (async function () {
            var bol_success = true;
            var code;
            try {
                await createUser();
            } catch (error) {
            	bol_success = false;
            	let errMsg = error.message || error;
            	console.log('error:_register'+ errMsg);
            	if (/username_UNIQUE/.test(errMsg)){
            		code = 1001;
            	}else if (/phone_UNIQUE/.test(errMsg)) {
            		code = 1002;
            	}else if (/email_UNIQUE/.test(errMsg)) {
            		code = 1003;
            	}
            }
			res.status(200);
            if (bol_success) {
            	res.send({ok:true});
            }else{
            	code = code || 1000;
            	res.send({ok:false,code:code});
            }
        })();
	});

	////======== 定制404 ========
	app.use(function(req,res){
		res.status(404);
		res.render('404',{uid:req.session.uid});
	});

	////======== 定制500 ========
	app.use(function(req,res){
		console.log("[xuezike-debug-info] =========== err "+ err.stack);
		res.status(500);
		res.render('500',{uid:req.session.uid})
	});
}


module.exports = MyRouter;