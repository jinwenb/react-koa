const mysql = require('mysql');
const config = require('../config/mysql');
let util = require('../util/index');
let db = mysql.createPool({
    user: config.username,
    password: config.password,
    database: config.database
});
db._query = db.query;
db.query = sql => new Promise((resolve, reject) => {
    db._query(sql, (err, data) => {
        if (err) {
            reject(err)
        } else {
            resolve(data)
        }
    })
});
db.select = async (table, data, where) => {
    let arr = [];
    let sql;
    if (!data || data === '*') {
        data = '*'
    } else {
        data = data.join(',')
    }
    if (!where) {
        sql = `SELECT ${data} FROM ${table}`
    } else {
        if (where.password) {
            where.password = util.md5(where.password);
        }
        Object.keys(where).forEach(key => {
            arr.push(`${key}='${where[key]}'`)
        });
        arr = arr.join(' AND ');
        sql = `SELECT ${data} FROM ${table} WHERE ${arr}`;
    }
    return await db.query(sql)
};
db.insert = async (table, data) => {
    let keys = [];
    let value = [];
    if (data.password) {
        data.password = util.md5(data.password);
    }
    data.id = util.uuid();
    Object.keys(data).forEach(key => {
        keys.push(`${key}`);
        value.push(`'${data[key]}'`)
    });
    keys = keys.join(',');
    value = value.join(',');
    return await db.query(`INSERT INTO ${table}(${keys}) VALUES(${value})`)
};
db.update = async (table, data, where) => {
    let sql;
    let arr = [];
    Object.keys(data).forEach(key => {
        arr.push(`${key}='${data[key]}'`)
    });
    arr = arr.join(',');
    if (!where) {
        sql = `UPDATE ${table} SET ${arr}`
    } else {
        let arr2 = [];
        Object.keys(where).forEach(key => {
            arr2.push(`${key}='${where[key]}'`)
        });
        sql = `UPDATE ${table} SET ${arr} WHERE ${arr2}`;
    }
    return await db.query(sql)
};
db.delete = async (table, where = {}) => {
    let arr = [];
    Object.keys(where).forEach(key => {
        arr.push(`${key}='${where[key]}'`)
    });
    arr = arr.join(' AND ');
    return await db.query(`DELETE FROM ${table} WHERE ${arr}`)
};
module.exports = db;


