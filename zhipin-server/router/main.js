/*
* 请求根路径
*
* */
const Router = require('koa-router');
let router = new Router();
router.get('/main', async ctx => {
    let id = ctx.cookies.get('user_id');
    if (!id) {
        return ctx.body = {
            code: 1,
            msg: '请先去登陆'
        }
    }
    let {db} = ctx;
    let result = await db.select(`user`, ['id', 'type', 'username', 'header', 'post', 'info', 'company', 'salary'], {id});
    if (result.length === 0) {
        ctx.body = {
            code: 1,
            msg: '不要投机取巧'
        }
    } else {
        return ctx.body = {
            code: 0,
            data: result[0]
        }
    }
});
router.get('/getUserList', async ctx => {
    let {type} = ctx.query;
    if (!type) {
        return ctx.body = {
            code: 1,
            msg: '不要想躲过校验'
        }
    }
    let {db} = ctx;
    let result = await db.select(`user`, null, {type});
    ctx.body = {
        code: 0,
        data: result
    }
});
module.exports = router;