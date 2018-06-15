"use strict";

var Redis = require('ioredis');
var logger = console;

var redisCluster = function () {};
module.exports = redisCluster;

var _cluster = null;
var _option = {};
var _prefix = "cac:"; // central admin console.

redisCluster.init = function (nodes, option) {
    _option = option;
    _cluster = new Redis.Cluster(nodes, option);

    _cluster.on("connect", function() {
        for (var i = 0 ; i < nodes.length ; i++) {
            logger.info("redis server  %s:%s is connected.", nodes[i].host, nodes[i].port);
        }
    });

    _cluster.on("error", function(err) {
        logger.error("cannot connect to redis server. err: %s", err);
    });

    return redisCluster;

};

/**
 * set key/value pair to redis. value is serialized by JSON.stringify().
 * @param key
 * @param value
 * @param expire is time in seconds. its default value is 24 hours (86400).
 */
redisCluster.set = function(key, value, expire) {

    if (!key) {
        return Promise.reject(new Error("Redis key cannot be empty."));
    }

    if (!value && value !== 0) {
        return Promise.reject(new Error("Cannot set empty value."));
    }

    expire = parseInt(expire);

    if (isNaN(expire)) {
        expire = 0;
    }

    if (expire < 0) {
        expire = 0;
    }

    expire = expire || 86400;

    var fullKey = _prefix + key;

    //console.log('redis-------------set------------fullKey:' + fullKey);
    //console.log('redis-------------set------------value:' + JSON.stringify(value));

    return _cluster.set(fullKey, JSON.stringify(value), 'EX', expire);
};

/**
 * set expire for a key to redis.
 * @param key
 * @param expire is time in seconds. its default value is 24 hours (86400).
 */
redisCluster.expire = function(key, expire) {

    if (!key) {
        return Promise.reject(new Error("Redis key cannot be empty."));
    }

    if (!expire) {
        return Promise.reject(new Error("Cannot set empty expire."));
    }

    expire = parseInt(expire);

    if (isNaN(expire)) {
        expire = 0;
    }

    if (expire <= 0) {
        return Promise.reject(new Error("expire is useless."));
    }

    var fullKey = _prefix + key;

    return _cluster.expire(fullKey, expire);
};

/**
 * get redis value.
 * @param key
 */
redisCluster.get = function(key) {

    if (!key) {
        return Promise.reject(new Error("Redis key cannot be empty."));
    }

    var fullKey = _prefix + key;

    return _cluster.get(fullKey).then(function (reply) {
        return JSON.parse(reply);
    });
};

/**
 * delete a redis key.
 * @param key
 */
redisCluster.del = function(key) {

    if (!key) {
        return Promise.reject(new Error("Redis key cannot be empty."));
    }

    return _cluster.del(_prefix + key);
};