const crypto = require('crypto');
const uuidV4 = require('uuid');
module.exports = {
    md5(str) {
        const hash = crypto.createHash('md5');
        hash.update(str);
        str = hash.digest('hex');
        return str.replace(/-/g, '')
    },
    uuid() {
        return uuidV4().replace(/-/g, '')
    },
    //数据库操作
    find: async function (table, data, where, flag) {
        let {db} = this;
        try {
            let user = await db.select(table, data, where);
            if (user.length > 0) {
                this.cookies.set('user_id', user[0].id,
                    {
                        domain: 'localhost',  // 写cookie所在的域名
                        maxAge: 10 * 60 * 1000, // cookie有效时长
                        httpOnly: false,  // 是否只用于http请求中获取
                        overwrite: false  // 是否允许重写
                    });
                let obj = {};
                Object.keys(user[0]).forEach(key => {
                    obj[key] = user[0][key]
                });
                this.body = {
                    code: 0,
                    data: obj
                }
            } else {
                let obj = {code: 1, msg: '此用户不存在'};
                if (flag) {
                    obj.msg = '账号或者密码错误'
                }
                this.body = obj
            }
        } catch (e) {
            this.body = {
                code: 1,
                msg: '数据库错误'
            }
        }
    },
    //判断是否有空值的方法
    includes(...arg) {
        return arg.includes('')
    }
};


