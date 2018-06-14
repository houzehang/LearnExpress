////======== 登录 ========

let userDao = require('../dao/userDao');

module.exports = function(app) {

	app.get('/login', function(req, res) {
		res.render('login', {
			isLoginOrRegister: true
		});
	});

	app.get('/register', function(req, res) {
		res.render('register', {
			isLoginOrRegister: true
		});
	});

	app.post('/login', function(req, res) {

		////======== 1.声明 ========
		let verifying = false;
		let result = {};
		let uid = req.session.uid;

		let accountname = req.body.accountname;
		let password = req.body.password;
		let userInfo = null;

		////======== 2.验证 ========
		if (verifying && !uid) {
			result.code = 1003;
			res.send(result);
			return;
		}

		////======== 3.逻辑 ========
		function checkExist(keyName) {
			return userDao.getUserThroughLogin(keyName, accountname, password).then(function(dbRes) {
				if (dbRes && dbRes.length > 0) {
					userInfo = dbRes[0];
				}
			});
		}

		(async function() {
			result.ok = true;
			
			try {

				let keys = ['username', 'phone', 'email'];
				for (let i = 0, len = keys.length; i < len; i++) {
					!userInfo && await checkExist(keys[i]);
				}
				result.ok = !!userInfo;

			} catch (error) {
				result.ok = false;
				let errMsg = error.message || error;
				console.log('[post-error-msg]' + req.route.path + 'error:' + errMsg);
			}
			if (userInfo) {
				req.session.uid = userInfo.id;
				req.session.accountname = accountname;
			}
			res.status(200);
			console.log('[post-result] ' + req.route.path + ' result :' + JSON.stringify(result));
			res.send(result);
		})();
	});

	////======== 退出 ========
	app.post('/exit', function(req, res) {
		delete req.session.uid;
		delete req.session.accountname;
		res.send({
			ok: true
		});
	});

	////======== 注册 ========
	app.post('/register', function(req, res) {

		////======== 1.声明 ========
		let verifying = false;
		let result = {};
		let uid = req.session.uid;

		let phone = req.body.phone;
		let email = req.body.email;
		let password = req.body.password;
		let username = req.body.username;
		let createTime = Date.now();

		////======== 2.验证 ========
		if (verifying && !uid) {
			result.code = 1003;
			res.send(result);
			return;
		}

		////======== 3.逻辑 ========
		function createUser() {
			return userDao.createUser(username, password, phone, email, createTime).then(function(dbRes) {});
		}

		(async function() {
			result.ok = true;
			
			try {
				await createUser();
			} catch (error) {
				result.ok = false;
				let errMsg = error.message || error;
				console.log('[post-error-msg]' + req.route.path + 'error:' + errMsg);
				
				if (/username_UNIQUE/.test(errMsg)) {
					result.code = 1001;
				} else if (/phone_UNIQUE/.test(errMsg)) {
					result.code = 1002;
				} else if (/email_UNIQUE/.test(errMsg)) {
					result.code = 1003;
				}
			}
			res.status(200);
			console.log('[post-result] ' + req.route.path + ' result :' + JSON.stringify(result));
			res.send(result);
		})();
	});
}