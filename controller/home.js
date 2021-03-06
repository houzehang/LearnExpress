////======== 主页 ========

module.exports = function(app) {

	let viewName = 'home';

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
		(async function() {
			try {

			} catch (error) {
				let errMsg = error.message || error;
				console.log('[get-error-msg] ' + req.route.path + 'error:' + errMsg);
			}
			res.status(200);
			let result = Object.assign({
				uid: req.session.uid,
				accountname: req.session.accountname
			}, {});
			console.log('[get-result] ' + req.route.path + ' result :' + JSON.stringify(result));
			res.render(viewName, result);
		})()
	});

	app.post('/postname', function(req, res) {

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
		(async function() {
			let result = {};
			result.ok = true;
			
			try {

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