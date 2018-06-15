////======== 开店 ========

let shopDao = require('../dao/shopDao');
let studentDao = require('../dao/studentDao');
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
				}
			});
		}
		(async function() {
			try {
				await getStudentByUid(uid);
			} catch (error) {
				let errMsg = error.message || error;
				console.log('[get-error-msg] ' + req.route.path + 'error:' + errMsg);
			}
			res.status(200);
			let result = Object.assign({
				uid: req.session.uid,
				accountname: req.session.accountname
			}, student);
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
		let logo = req.body.logo;
		let classstr = req.body.class;
		let sid = req.body.sid;
		let open = req.body.open;
		let goodscount = req.body.goodscount;
		let notice = req.body.notice;
		let scope = req.body.scope;
		let carryprice = req.body.carryprice;
		let people = req.body.people;
		let tradeway = req.body.tradeway;
		let createtime = Date.now();

		////======== 2.验证 ========
		if (verifying && !uid) {
			result.code = 1003;
			res.send(result);
			return;
		}

		////======== 3.逻辑 ========
		function createShop() {
			return shopDao.createShop(uid, name, logo, classstr, sid, open, goodscount, notice, scope, carryprice, people, tradeway, createtime).then(function(dbRes) {});
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