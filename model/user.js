"use strict";
/**
 * Initialize a new 'User' with the given 'opts'.
 * @param {Object} opts
 * @api public
 */
var User = function(opts) {
    if (!opts || !opts.id) return;

    this.id = opts.id;
    this.username = opts.username;
    this.password = opts.password;
    this.email = opts.email;
    this.phone = opts.phone;
    this.createTime = opts.createTime;
};

User.prototype.toClient = function() {
    return {
        id: this.id,
        username: this.username,
        email: this.email,
        phone: this.phone
    };
};

module.exports = function(opts) {
    var out;
    if (opts) {
        out = new User(opts);
    }
    return out;
};