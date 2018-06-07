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
		res.status(200);
		res.render('about');
	});

	////======== 注册 ========
	app.post('/_register',function(req,res){
 		
 		var phone = req.body.phone_number;
        var email = req.body.email;
        var password = req.body.password;
        var name = req.body.username;
        var deviceId = req.body.deviceId || 'iphone-1';
        var deviceName = req.body.deviceName || '';
        var deviceOS = req.body.deviceOS || '';
        var fromChannel = req.body.fromChannel || 0;
        var salt = '';
        var secret = '';
        var ip = '1234567';
        var createTime = Date.now();
        var type = 0;

		function createUser(){
			return userDao.createUser(email, phone, secret, salt, deviceId, deviceName, deviceOS, ip, createTime, type, fromChannel)
                .then(function (dbRes) {

                });
		}

        (async function () {
            var sendData;

            try {
            	console.log('createUser');
                await createUser();
            } catch (error) {
            	console.log('error:_register'+ (error.message || error));
            }

			res.status(200);
			res.render('about');
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