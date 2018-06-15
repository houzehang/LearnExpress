"use strict";

var shopDao = module.exports;
var sqlClient = require('./../sql_client');
var nodeUtil = require('util');
var TABLE_NAME = 'shop';

shopDao.createShop = function (uid, name, logo, kinds, sid, open, goodscount, notice, scope, carryprice, people, tradeway, createtime) {
    createtime = createtime || Date.now();
    var sql = nodeUtil.format('insert into %s ' +
        '(uid, name, logo, kinds, sid, open, goodscount, notice, scope, carryprice, people, tradeway, payway, createtime)' +
        ' values(?,?,?,?,?,?,?,?,?,?,?,?,?,?) on  DUPLICATE key update name = ?, logo = ?,kinds = ?,sid = ?,open = ?,goodscount = ?,notice = ?,scope = ?,carryprice = ?,people = ?,tradeway = ?,payway = ?', TABLE_NAME);

    var args = [uid, name, logo, kinds, sid, open, goodscount, notice, scope, carryprice ,people, tradeway, payway, createtime, 
    	name, logo, kinds, sid, open, goodscount, notice, scope, carryprice, people, tradeway, payway];
    return sqlClient.insert(sql, args);
};

shopDao.getShopByUid = function (uid) {
    var sql  = nodeUtil.format('select * from %s where %s = ? limit 1', TABLE_NAME, 'uid');
    var args = [uid];

    return sqlClient.query(sql, args);
};
