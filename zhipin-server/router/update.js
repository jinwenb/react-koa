/*
* 更新接口
*
*
* */

const Router = require('koa-router');
const router = new Router();
router.post('/', async ctx => {
    let id = ctx.cookies.get('user_id');
    if (!id) {
        return ctx.body = {
            code: 1,
            msg: '请先去登陆'
        }
    }
    let {db} = ctx;
    let body = ctx.request.body;
    await db.update(`user`, body, {id});
    let result = await db.select(`user`, ['id', 'type', 'username', 'header', 'post', 'info', 'company', 'salary'], {id});
    if (result.length > 0) {
        ctx.body = {
            code: 0,
            data: result[0]
        }
    } else {
        ctx.body = {
            code: 1,
            msg: '请不要枉费心机改id'
        }
    }

});
module.exports = router;
