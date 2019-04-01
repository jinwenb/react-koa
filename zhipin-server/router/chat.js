/*
* 消息列表数据
*
* */
const Router = require('koa-router');
let router = new Router();
const chat = require('../mongoose/chat');
router.get('/msgList', async ctx => {
    let user = await ctx.db.select('user');
    await chat.find({}, async (err, message) => {
        let obj = {message, users: {}};
        for (let item of user) {
            obj.users[item.id] = {
                header: item.header,
                username: item.username
            }
        }
        ctx.body = {
            code: 0,
            data: obj
        }
    });

});
router.post('/counter', async ctx => {
    let {user_from} = ctx.request.body;
    let result = await chat.find({chat_id: user_from, readCount: 0});
    await chat.update({chat_id: user_from}, {readCount: 1}, {multi: true});
    ctx.body = {
        code: 0,
        data: result.length
    }
});
module.exports = router;