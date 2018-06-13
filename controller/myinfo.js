////======== 我的信息 ========

let studentDao = require('../dao/studentDao');

module.exports = function(app) {

	let viewName = 'myinfo';

	app.get('/' + viewName, function(req, res) {

		////======== 1.声明 ========
		let verifying = true;
		let uid = req.session.uid;

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

	app.post('/createStudent', function(req, res) {

		////======== 1.声明 ========
		let verifying = true;
		let result = {};
		let uid = req.session.uid;
		let name = req.body.name;
		let sex = req.body.sex;
		let age = req.body.age;
		let sid = req.body.sid;
		let tel = req.body.tel;
		let address = req.body.address;
		let score = 0;
		let createtime = Date.now();

		////======== 2.验证 ========
		if (verifying && !uid) {
			result.code = 10003;
			res.send(result);
			return;
		}

		////======== 3.逻辑 ========
		function createStudent() {
			return studentDao.createStudent(uid, name, sex, age, sid, tel, address, score, createtime).then(function(dbRes) {});
		}

		(async function() {
			result.ok = true;

			try {
				await createStudent();
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