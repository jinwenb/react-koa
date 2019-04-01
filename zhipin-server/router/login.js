const Router = require('koa-router');
let router = new Router();
router.post('/', async ctx => {
    let {username, password} = ctx.request.body;
    return await ctx.find(`user`, null, {
        username,
        password
    },true)
});
module.exports = router;