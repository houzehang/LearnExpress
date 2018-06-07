"use strict";

exports.session = {
    secret: 'icebird901',
    cookie: {
        maxAge: 12 * 3600 * 1000//12 * 3600 * 1000    //12h
    },
    name: 'sx-session',
    rolling: false   //是否自动刷新持续时间
};

exports.cookie = {
    maxAge: 12 * 3600 * 1000  //12h
}

exports.mysql = {
    connectionLimit: 10,
    host : "127.0.0.1",
    port : 3306,
    database : "xuezike",
    user : "root",
    password : "root"
};
