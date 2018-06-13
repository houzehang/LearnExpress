"use strict";

var userDao = module.exports;
var sqlClient = require('./sql_client');
var nodeUtil = require('util');
var TABLE_NAME = 'user';

userDao.createUser = function (username, password, phone, email, createTime) {
    createTime = createTime || Date.now();
    var sql = nodeUtil.format('insert into %s ' +
        '(username, password, phone, email, createTime)' +
        ' values(?,?,?,?,?)', TABLE_NAME);

    var args = [username, password, phone, email, createTime];
    return sqlClient.insert(sql, args);
};

userDao.bindPhone = function (uid, phone) {
    var sql = nodeUtil.format('update %s set phone = ? where uid = ?', TABLE_NAME);
    var args = [phone, uid];
    return sqlClient.insert(sql, args);
};

userDao.update = function (uid, attrName, attr) {
    var sql = nodeUtil.format('update %s set %s = ? where uid = ?', TABLE_NAME, attrName);
    var args = [attr, uid];
    return sqlClient.update(sql, args);
};

userDao.updatePassword = function (uid, password, salt) {
    var sql = nodeUtil.format('update %s set password = ?, salt = ? where uid = ?', TABLE_NAME);
    var args = [password, salt, uid];
    return sqlClient.update(sql, args);
};

userDao.getUserThroughLogin= function(key,value,password){
    var sql  = nodeUtil.format('select id, username, phone, email from %s where %s = ? and password = ? limit 1', TABLE_NAME, key);
    var args = [value,password];

    return sqlClient.query(sql, args);
};

userDao.getUserByKey = function (key, value) {
    var sql  = nodeUtil.format('select id, username, password, phone, email, createTime' +
        ' from %s where %s = ? limit 1', TABLE_NAME, key);
    var args = [value];

    return sqlClient.query(sql, args);
};

userDao.getUserById = function (uid) {
    var sql  = nodeUtil.format('select id, username, password, phone, email, createTime' +
        ' from %s where %s = ? limit 1', TABLE_NAME, 'id');
    var args = [uid];

    return sqlClient.query(sql, args);
};

userDao.getUserByPhone = function (phone) {
    var sql  = nodeUtil.format('select id, username, password, phone, email, createTime' +
        ' from %s where %s = ? limit 1', TABLE_NAME, 'phone');
    var args = [phone];

    return sqlClient.query(sql, args);
};

userDao.getUserByEmail = function (email) {
    var sql  = nodeUtil.format('select id, username, password, phone, email, createTime' +
        ' from %s where %s = ? limit 1', TABLE_NAME, 'email');
    var args = [email];

    return sqlClient.query(sql, args);
};
