var express = require('express');
var fortune = require('./lib/fortune.js');
var app = express();

////======== 设置 handlebars 视图引擎 ========
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.set('port',process.env.PORT || 3100);

////======== 测试选项 ========
app.use(function(req,res,next){
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});
app.use(express.static(__dirname + '/public'));


////======================== 路由相关 ========================


////======== 主页 ========
app.get('/',function(req,res){
	res.render('home');
});

////======== 关于 ========
app.get('/about',function (req,res) {
	res.render('about',{fortune:fortune.getFortune()});
});

////======== 定制404 ========
app.use(function(req,res){
	res.status(404);
	res.render('404');
});

////======== 定制500 ========
app.use(function(req,res){
	console.log("[xuezike-debug-info] =========== err "+ err.stack);
	res.status(500);
	res.render('500')
});


////======== 启动 ========
app.listen(app.get('port'),function(){
	console.log("[xuezike-debug-info] =========== express started on http://localhost "+ app.get('port'));
});