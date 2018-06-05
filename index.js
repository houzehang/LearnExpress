var express = require('express');
var fortune = require('./lib/fortune.js');
var app = express();
var MyRouter = require('./routes/myRouter.js');
////======== handlebars ========
var handlebars = require('express3-handlebars').create({defaultLayout:'nav'});
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');

app.set('port',process.env.PORT || 3200);

////======== QA ========
app.use(function(req,res,next){
	res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
	next();
});
app.use(express.static(__dirname + '/public'));

////======== Router ========
var myRouter = new MyRouter(app);
myRouter.initAll();

////======== 启动 ========
app.listen(app.get('port'),function(){
	console.log("[xuezike-debug-info] =========== express started on http://localhost "+ app.get('port'));
});