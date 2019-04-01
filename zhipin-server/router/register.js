const Router = require('koa-router');
let {includes} = require('../util/index')
let router = new Router();
router.post('/', async ctx => {
    let {username, password, type} = ctx.request.body;
    if (includes(username, password, type)) {
        ctx.body = {
            code: 1,
            msg: '请不要侥幸躲过验证'
        }
    }
    let {db} = ctx;
    let users = await db.select(`user`, null, {username});
    if (users.length === 0) {
        await db.insert(`user`, {username, password, type});
        return await ctx.find(`user`, ['id', 'type', 'username'], {username})
    } else {
        ctx.body = {
            code: 1,
            msg: '此用户已经存在'
        }
    }

});
module.exports = router;