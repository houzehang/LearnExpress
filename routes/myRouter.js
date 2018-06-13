'use strict';
let viewDataMgr = require('../viewdata/viewDataMgr')

let router_account = require('./router_account');
let router_shop = require('./router_shop');

let path = require('path');
let fs_util = require(path.join(__dirname, './../utils/fs_util.js'));
let viewConfig = require('../config/view_config');
let MyRouter = function(app) {
	this.app = app;
}

MyRouter.prototype.initAll = function() {
	let app = this.app;
	if (!app) {
		return
	}

	////======== 主页 ========
	app.get('/', function(req, res) {
		res.render('home');
	});

	////======== 根据视图名称路由 ========
	let viewNameArr = [];
	fs_util.findSync(path.join(__dirname, './../views/')).map(function(item) {
		viewNameArr.push(item.match(/([^<>/\\\|:""\*\?]+\.\w+$)/)[0].replace('.handlebars', ''))
	});
	for (var i = 0, len = viewNameArr.length; i < len; i++) {
		let viewName = viewNameArr[i];
		app.get('/' + viewName, function(req, res) {
			if (viewConfig.viewsNeedVerifing.indexOf(viewName) > -1 && !req.session.uid) {
				////======== 需要验证登录的页面 ========
				res.render('login', {
					isLoginOrRegister: true
				});
			} else {
				////======== 获取相应页面的数据(读取数据库) ========
				viewDataMgr.getViewData(req, res, viewName, function(viewData) {
					res.render(viewName, Object.assign({
						uid: req.session.uid,
						accountname: req.session.accountname,
						isLoginOrRegister: /^login$|^register$/.test(viewName)
					}, typeof viewData == 'object' ? viewData : {}));
				});
			}
		});
	};

	router_account(app);


	////======== 定制404 ========
	app.use(function(req, res) {
		res.status(404);
		res.render('404', {
			uid: req.session.uid,
			accountname: req.session.accountname
		});
	});

	////======== 定制500 ========
	app.use(function(req, res) {
		console.log("[xuezike-debug-info] =========== err " + err.stack);
		res.status(500);
		res.render('500', {
			uid: req.session.uid,
			accountname: req.session.accountname
		})
	});
}


module.exports = MyRouter;