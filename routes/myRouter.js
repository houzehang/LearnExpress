'use strict';

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

	////======== 主页 ========
	app.get('/home',function(req,res){
		res.render('home');
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