const koa = require('koa');
const bodyParser = require('koa-body-parser');
const convert = require('koa-convert');
const Router = require('koa-router');
const db = require('./mysql/index');
const login = require('./router/login');
const register = require('./router/register');
const update = require('./router/update');
const chat = require('./router/chat');
const main = require('./router/main');
let router = new Router();
const {find} = require('./util');
const app = new koa();
const server = require('http').createServer(app.callback());
app.use(async (ctx, next) => {
    ctx.db = db;
    ctx.find = find.bind(ctx);
    await next()
});
app.use(convert(bodyParser()));
router.use('/login', login.routes());
router.use('/register', register.routes());
router.use('/update', update.routes());
router.use('/chat', chat.routes());
app.use(router.routes());
app.use(main.routes());
server.listen(8080, () => {
    console.log("running server port 8080");
});
module.exports = server;

