
let userDao = require('../dao/userDao');
let studentDao = require('../dao/studentDao');
////======== 账户相关 ========
module.exports = function(app){

	////======== 登陆 ========
	app.post('/login',function(req,res){

		var accountname = req.body.accountname;
		var password = req.body.password;
		var userInfo = null;

		function checkExist(keyName){
			return userDao.getUserThroughLogin(keyName,accountname,password).then(function(dbRes){
				if (dbRes && dbRes.length > 0) {
					userInfo = dbRes[0];
				}
			});
		}
		(async function () {
			try{
				let keys = ['username','phone','email'];
				for(let i = 0,len = keys.length; i < len; i++){
					!userInfo && await checkExist(keys[i]);
				}
			}catch(error){
            	let errMsg = error.message || error;
            	console.log('error:_register'+ errMsg);
			}
			console.log('[mylog] ================ login->userInfo ' + JSON.stringify(userInfo));
			res.status(200);
			if (userInfo) {
				req.session.uid = userInfo.id;
				req.session.accountname = accountname;
				res.send({ok:true});
			}else{
				res.send({ok:false});
			}
		})()
	});

	////======== 退出 ========
	app.post('/exit',function(req,res){
		delete req.session.uid;
		delete req.session.accountname;
		res.send({ok:true});
	});

	////======== 注册 ========
	app.post('/register',function(req,res){
 		
 		var phone = req.body.phone;
        var email = req.body.email;
        var password = req.body.password;
        var username = req.body.username;
        var createTime = Date.now();

		function createUser(){
			return userDao.createUser(username, password, phone, email, createTime).then(function (dbRes) {});
		}

        (async function () {
            var bol_success = true;
            var code;
            try {
                await createUser();
            } catch (error) {
            	bol_success = false;
            	let errMsg = error.message || error;
            	console.log('error:_register'+ errMsg);
            	if (/username_UNIQUE/.test(errMsg)){
            		code = 1001;
            	}else if (/phone_UNIQUE/.test(errMsg)) {
            		code = 1002;
            	}else if (/email_UNIQUE/.test(errMsg)) {
            		code = 1003;
            	}
            }
			res.status(200);
            if (bol_success) {
            	res.send({ok:true});
            }else{
            	code = code || 1000;
            	res.send({ok:false,code:code});
            }
        })();
	});

	////======== 创建student ========
	app.post('/createStudent',function(req,res){
 		
 		var uid = req.session.uid;
 		var name = req.body.name;
        var sex = req.body.sex;
        var age = req.body.age;
        var sid = req.body.sid;
        var tel = req.body.tel;
        var address = req.body.address;
        var score = 0;
        var createtime = Date.now();

        if (!uid) {
        	res.send({ok:false,code:1003});
        	return;
        }

		function createStudent(){
			return studentDao.createStudent(uid, name, sex, age, sid, tel, address, score, createtime).then(function (dbRes) {});
		}

        (async function () {
            var bol_success = true;
            var code;
            try {
                await createStudent();
            } catch (error) {
            	bol_success = false;
            	let errMsg = error.message || error;
            	console.log('error:createStudent'+ errMsg);
            }
			res.status(200);
            if (bol_success) {
            	res.send({ok:true});
            }else{
            	code = code || 1000;
            	res.send({ok:false,code:code});
            }
        })();
	});
}