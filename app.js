var express = require('express');
var fortune = require('./lib/fortune.js');
var credentials = require('./credentials.js');
var app = express();

////======== 1.模板引擎 ========
var handlebars = require('express3-handlebars').create({
	defaultLayout: 'nav'
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


////======== 2.配置 ========
app.set('serverConfig', require('./config/server_config'));
app.set('port', process.env.PORT || 3200);
app.set('viewConfig', require('./config/view_config'));

////======== 3.数据库 ========
var dbClient = require('./dao/sql/sql_client').init(app.get('serverConfig').mysql, require('mysql'), null);
app.set('dbClient', dbClient);


////======== 4.测试中间件 ========
app.use(function(req, res, next) {
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});


////======== 5.资源路径 ========
app.use(express.static(__dirname + '/public'));


////======== 6.会话中间件 ========
app.use(require('body-parser').urlencoded({
	extended: false
}));
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({
	rolling: true,
	resave: true,
	saveUninitialized: false,
	cookie: {
		maxAge: app.get('serverConfig').session.cookie.maxAge
	},
	secret: app.get('serverConfig').session.secret
}));

////======== 7.路由 ========
app.get('/', function(req, res) {res.render('home');});
require('require-all')({
	dirname: __dirname + '/controller',
	filter: /^.*?\.js$/,
	resolve: function(Controller) {
		if (Controller && typeof Controller === 'function') {
			return new Controller(app);
		}
	}
});

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
	res.status(500);
	res.render('500', {
		uid: req.session.uid,
		accountname: req.session.accountname
	})
});

////======== 8.启动 ========
app.listen(app.get('port'), function() {
	console.log("[xuezike-debug-info] =========== express started on http://localhost:" + app.get('port'));
});