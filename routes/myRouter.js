'use strict';
let path = require('path');
let fs_util = require(path.join(__dirname, './../utils/fs_util.js'));
let userDao = require('../dao/userDao');

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
			res.render(viewName);
		});
	};

	////======== 登陆 ========
	app.post('/_login',function(req,res){

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
			console.log('[mylog] ================ userInfo ' + JSON.stringify(userInfo));
			res.status(200);
			let desc = '登录成功'
			if (userInfo) {
				res.render('result',{isOk:true,desc:desc,url:'home',staytime:2000});
			}else{
				desc = '用户名或密码错误'
				res.render('result',{isOk:false,desc:desc,goBack:true,staytime:2000});
			}
		})()
	});

	////======== 注册 ========
	app.post('/_register',function(req,res){
 		
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
            var desc;
            try {
                await createUser();
            } catch (error) {
            	bol_success = false;
            	let errMsg = error.message || error;
            	console.log('error:_register'+ errMsg);
            	if (/username_UNIQUE/.test(errMsg)){
            		desc = '用户名已被占用，请更换'
            	}else if (/phone_UNIQUE/.test(errMsg)) {
            		desc = '手机号已被占用，请更换'
            	}else if (/email_UNIQUE/.test(errMsg)) {
            		desc = '该邮箱已被占用，请更换'
            	}
            }
			res.status(200);
            if (bol_success) {
            	desc = '恭喜！注册成功';
				res.render('result',{isOk:true,desc:desc,url:'login?username='+username,staytime:2000});
            }else{
            	desc = desc || '注册失败'
				res.render('result',{isOk:false,desc:desc,staytime:2000,goBack:true});
            }
        })();
	});

	////======== 定制404 ========
	app.use(function(req,res){
		res.status(404);
		res.render('404');
	});

	////======== 定制500 ========
	app.use(function(req,res){
		console.log("[xuezike-debug-info] =========== err "+ err.stack);
		res.status(500);
		res.render('500')
	});
}


module.exports = MyRouter;