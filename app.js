var express = require('express');
var fortune = require('./lib/fortune.js');
var credentials = require('./credentials.js');
var app = express();
var MyRouter = require('./routes/myRouter.js');


////======== 1.模板引擎 ========
var handlebars = require('express3-handlebars').create({defaultLayout:'nav'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');


////======== 2.配置 ========
app.set('serverConfig', require('./config/server_config'));
app.set('port',process.env.PORT || 3200);


////======== 3.测试中间件 ========
app.use(function(req,res,next){
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});


////======== 4.资源路径 ========
app.use(express.static(__dirname + '/public'));


////======== 5.会话中间件 ========
app.use(require('body-parser').urlencoded({extended:false}));
app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({  
    resave: true,  
    saveUninitialized: true,  
    cookie: {maxAge:2000||app.get('serverConfig').session.cookie.maxAge},  
    secret: app.get('serverConfig').session.secret  
}));
app.use(function(req, res, next){
    req.session._garbage = Date();
    req.session.touch();
    next();
});

////======== 6.路由 ========
var myRouter = new MyRouter(app);
myRouter.initAll();


////======== 7.启动 ========
app.listen(app.get('port'),function(){
	console.log("[xuezike-debug-info] =========== express started on http://localhost:"+ app.get('port'));
});