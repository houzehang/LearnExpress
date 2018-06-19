////======== 开店 ========

let shopDao = require('../dao/sql/sql_dao/shopDao');
let studentDao = require('../dao/sql/sql_dao/studentDao');
let globalConfig = require('../config/global_config');
module.exports = function(app) {

	let viewName = 'openshop';

	app.get('/' + viewName, function(req, res) {

		////======== 1.声明 ========
		let uid = req.session.uid;
		let verifying = true;

		////======== 2.验证 ========
		if (verifying && !uid) {
			res.render('login', {
				isLoginOrRegister: true
			});
			return;
		}

		////======== 3.逻辑 ========
		let student = {};

		function getStudentByUid(uid) {
			return studentDao.getStudentByUid(uid).then(function(dbRes) {
				if (dbRes && dbRes.length > 0) {
					student = dbRes[0];
					student.studentcreatetime = student.createtime;
					delete student.createtime;
				}
			});
		}

		let shop = {};

		function getShopByUid(uid) {
			return shopDao.getShopByUid(uid).then(function(dbRes) {
				if (dbRes && dbRes.length > 0) {
					shop = dbRes[0];
					shop.shopname = shop.name;
					shop.shopcreatetime = shop.createtime;
					delete shop.name;
					delete shop.createtime;
				}
			});
		}
		(async function() {
			try {
				await getStudentByUid(uid);
				await getShopByUid(uid);
			} catch (error) {
				let errMsg = error.message || error;
				console.log('[get-error-msg] ' + req.route.path + 'error:' + errMsg);
			}
			res.status(200);
			let result = Object.assign({
				uid: req.session.uid,
				accountname: req.session.accountname,
				allkinds: globalConfig.goodskinds
			}, student, shop);
			console.log('[get-result] ' + req.route.path + ' result :' + JSON.stringify(result));
			res.render(viewName, result);
		})()
	});

	app.post('/openshop', function(req, res) {

		////======== 1.声明 ========
		let verifying = true;
		let result = {};
		let uid = req.session.uid;
		let name = req.body.name;
		let logo = req.body.icon;
		let classstr = req.body.kinds;
		let open = req.body.open;
		let goodscount = req.body.goodscount;
		let notice = req.body.notice;
		let scope = req.body.scope;
		let carryprice = req.body.carryprice;
		let carryfee = req.body.carryfee;
		let people = req.body.people;
		let tradeway = req.body.tradeway;
		let payway = req.body.payway;
		let createtime = Date.now();

		////======== 2.验证 ========
		if (verifying && !uid) {
			result.code = 1003;
			res.send(result);
			return;
		}

		////======== 3.逻辑 ========
		function createShop() {
			return shopDao.createShop(uid, name, logo, classstr, open, goodscount, notice, scope, carryprice, carryfee, people, tradeway, payway, createtime).then(function(dbRes) {});
		}

		(async function() {
			result.ok = true;

			try {
				await createShop();
			} catch (error) {
				result.ok = false;
				let errMsg = error.message || error;
				console.log('[post-error-msg]' + req.route.path + 'error:' + errMsg);
			}
			res.status(200);
			console.log('[post-result] ' + req.route.path + ' result :' + JSON.stringify(result));
			res.send(result);
		})();
	});
}