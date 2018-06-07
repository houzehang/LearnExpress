"use strict";

var mysql;
var logger = console;

var sqlClient = function () {};
module.exports = sqlClient;

var _pool = null;
var _client = {};
let _queryId = 0;
var map = {};

_client.init = function (config) {
    _pool = mysql.createPool(config);
};

_client.beginTransaction = function () {
    return new Promise(function (resolve, reject) {
        _pool.getConnection(function (err, connection) {

            if (err) {
                err.dbFailed = true;
                logger.error('query [%d] error:%s', _queryId, JSON.stringify(err));
                return reject(err);
            }
            connection.beginTransaction(function(err) {
                if (err) {
                    connection.release();
                    err.dbFailed = true;
                    logger.error('beginTransaction [%d] error:%s', ++_queryId, JSON.stringify(err));
                    return reject(err);
                }
                map[_queryId] = connection;
                resolve(_queryId);
            })

        });
    });
}

_client.commit = function (qid) {
    return new Promise(function (resolve, reject) {
        if(!map[qid]){
            return reject();
        }
        map[qid].commit(function(err) {
            if (err) {
                return map[qid].rollback(function() {
                    logger.error('commit [%d] error:%s', qid, JSON.stringify(err));
                    map[qid].release();
                    map[qid] = undefined;
                    err.dbFailed = true;
                    return reject(err);
                });
            }
            map[qid].release();
            map[qid] = undefined;
            logger.debug('commit [%d] result: success!', qid);
            resolve();
        });
    });
}

_client.rollback = function (qid) {
    return new Promise(function (resolve, reject) {
        if(!map[qid]){
            return resolve();
        }

        map[qid].rollback(function() {
            map[qid].release();
            map[qid] = undefined;
            logger.debug('rollback [%d] result: success!', qid);
            resolve();
        });
    });
}

_client.query = function (sql, args, qid) {
    logger.debug('query [%d] sql: {%s}, args: {%s}', ++_queryId, sql, JSON.stringify(args));

    if (!!map[qid]) {
        return new Promise(function (resolve, reject) {
            map[qid].query(sql, args, function (error, results) {

                if (error) {
                    error.dbFailed = true;
                    logger.error('query [%d] error:%s', _queryId, JSON.stringify(error));
                    return map[qid].rollback(function() {
                        map[qid].release();
                        map[qid] = undefined;
                        return reject(error);
                    });
                }

                logger.debug('query [%d] result: %s', _queryId, JSON.stringify(results));
                resolve(results);
            });
        });
    }

    return new Promise(function (resolve, reject) {
        _pool.getConnection(function(err, connection) {
            if (err) {
                err.dbFailed = true;
                logger.error('query [%d] error:%s', _queryId, JSON.stringify(err));
                return reject(err);
            }

            // Use the connection
            connection.query(sql, args, function (error, results) {
                // And done with the connection.
                connection.release();

                // Handle error after the release.
                if (error) {
                    error.dbFailed = true;
                    logger.error('query [%d] error:%s', _queryId, JSON.stringify(error));
                    return reject(error);
                }

                logger.debug('query [%d] result: %s', _queryId, JSON.stringify(results));
                resolve(results);
            });
        });
    });
};

_client.shutdown = function () {
    if (!_pool) {
        return;
    }

    _pool.end(function (err) {
        // all connections in the pool have ended
        logger.error(err);
    });
};

sqlClient.init = function (config, setMysql, setLogger) {
    mysql = setMysql;

    if (setLogger) {
        logger = setLogger;
    }

    if (!_pool) {
        _client.init(config);

        sqlClient.insert = _client.query;
        sqlClient.update = _client.query;
        sqlClient.delete = _client.query;
        sqlClient.query = _client.query;
        sqlClient.beginTransaction = _client.beginTransaction;
        sqlClient.commit = _client.commit;
        sqlClient.rollback = _client.rollback;
    }
};

sqlClient.shutdown = function () {
    _client.shutdown();
};