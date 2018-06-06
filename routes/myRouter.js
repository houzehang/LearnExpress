'use strict';
let path = require('path');
let fs_util = require(path.join(__dirname, './../utils/fs_util.js'));
let viewNameArr = [];
fs_util.findSync(path.join(__dirname, './../views/')).map(function(item){viewNameArr.push(item.match(/([^<>/\\\|:""\*\?]+\.\w+$)/)[0].replace('.handlebars',''))});

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
	for(var i = 0,len = viewNameArr.length; i < len; i++){
		let viewName = viewNameArr[i];
		app.get('/'+viewName,function(req,res){
			res.render(viewName);
		});
	};

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