////======== 我的笔记 ========

//======== 也可以使用下面的中间件强制更新session ========
app.use(function(req, res, next){
    req.session._garbage = Date();
    req.session.touch();
    next();
});