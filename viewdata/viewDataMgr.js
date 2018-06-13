let studentDao = require('../dao/studentDao');
module.exports = {
	getViewData: function(req, res, viewName, callback) {
		let uid = req.session.uid;
		if (viewName == 'myinfo') {
			let student;

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
					console.log('error:_register' + errMsg);
				}
				console.log('[mylog] ================ getViewData-> ' + viewName + ':' + JSON.stringify(student));
				res.status(200);
				if (student) {
					console.log('student'+JSON.stringify(student));
					callback(student);
				} else {
					callback({});
				}
			})()

		} else {
			callback({
				hometel: 54545
			});
		}
	}
}