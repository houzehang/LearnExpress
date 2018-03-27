var express = require('express');
var app = express();

////======== 设置 handlebars 视图引擎 ========
var handlebars = require('express3-handlebars').create({defaultLayout:'main'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.set('port',process.env.PORT || 3100);
app.use(express.static(__dirname + '/public'));
app.get('/',function(req,res){
	res.render('home');
});

app.get('/about',function (req,res) {
	res.render('about',{age:14});
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