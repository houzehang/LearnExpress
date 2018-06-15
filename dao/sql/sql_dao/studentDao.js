"use strict";

var studentDao = module.exports;
var sqlClient = require('./../sql_client');
var nodeUtil = require('util');
var TABLE_NAME = 'student';

studentDao.createStudent = function (uid, name, sex, age, sid, tel, address, score, createtime) {
    createtime = createtime || Date.now();
    var sql = nodeUtil.format('insert into %s ' +
        '(uid, name, sex, age, sid, tel, address, score, createtime)' +
        ' values(?,?,?,?,?,?,?,?,?) on  DUPLICATE key update name = ?, sex = ?,age = ?,sid = ?,tel = ?,address = ?,score = ?', TABLE_NAME);

    var args = [uid, name, sex, age, sid, tel, address, score, createtime,name, sex, age, sid, tel, address, score];
    return sqlClient.insert(sql, args);
};


studentDao.getStudentByUid = function (uid) {
    var sql  = nodeUtil.format('select * from %s where %s = ? limit 1', TABLE_NAME, 'uid');
    var args = [uid];

    return sqlClient.query(sql, args);
};
