"use strict";

var userDao = module.exports;
var sqlClient = require('./sql_client');
var nodeUtil = require('util');
var TABLE_NAME = 'User';

userDao.createUser = function (email, phone, secret, salt, deviceId, deviceName, deviceOS, ip, createTime, type, fromChannel, tempId) {
    var sql = nodeUtil.format('insert into %s ' +
        '(email, phone, secret, salt, deviceId, deviceName, deviceOS, createIp, createTime, type, fromChannel, tempId)' +
        ' values(?,?,?,?,?,?,?,?,?,?,?,?)', TABLE_NAME);

    var args = [email, phone, secret, salt, deviceId, deviceName, deviceOS, ip, createTime, type, fromChannel,tempId];
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

userDao.updatePassword = function (uid, secret, salt) {
    var sql = nodeUtil.format('update %s set secret = ?, salt = ? where uid = ?', TABLE_NAME);
    var args = [secret, salt, uid];
    return sqlClient.update(sql, args);
};

function getUser(sql, args) {
    return new Promise(function (resolve, reject) {
        sqlClient.query(sql, args).then(function (data) {

            if (data.length == 0) {
                return resolve(null);
            }

            resolve(data[0]);
        }, function (err) {
            reject(err);
        });
    });
}

userDao.getUserBy = function (key, value) {
    var sql  = nodeUtil.format('select id, secret, salt, email, phone, createTime, onlineTime, bannedUntil, lastLoginTime, loginCount, tempId, deviceId' +
        ' from %s where %s = ? limit 1', TABLE_NAME, key);
    var args = [value];

    return getUser(sql, args);
};

userDao.getUserById = function (uid) {
    var sql  = nodeUtil.format('select id, secret, salt, email, phone, createTime, onlineTime, bannedUntil, lastLoginTime, loginCount, tempId, deviceId' +
        ' from %s where %s = ? limit 1', TABLE_NAME, 'id');
    var args = [uid];

    return getUser(sql, args);
};

userDao.getUserByPhone = function (phone) {
    var sql  = nodeUtil.format('select id, secret, salt, email, phone, createTime, onlineTime, bannedUntil, lastLoginTime, loginCount, tempId, deviceId ' +
        ' from %s where %s = ? limit 1', TABLE_NAME, 'phone');
    var args = [phone];

    return getUser(sql, args);
};

userDao.getUserByEmail = function (email) {
    var sql  = nodeUtil.format('select id, secret, salt, email, phone, createTime, onlineTime, bannedUntil, lastLoginTime, loginCount, tempId, deviceId ' +
        ' from %s where %s = ? limit 1', TABLE_NAME, 'email');
    var args = [email];

    return getUser(sql, args);
};

userDao.getUserByTempId = function (tempId) {
    var sql  = nodeUtil.format('select id, secret, salt, email, phone, createTime, onlineTime, bannedUntil, lastLoginTime, loginCount, tempId, deviceId ' +
        ' from %s where %s = ? limit 1', TABLE_NAME, 'tempId');
    var args = [tempId];

    return getUser(sql, args);
};