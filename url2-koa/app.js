//导入koa，在koa2中，我们导入的是一个class，因此用大写的Koa表示
const Koa = require('koa');
//require("koa-router")返回的是函数
const router = require("koa-router")();
const bodyParser = require("koa-bodyparser")();
const controller = require('./controller');
//创建一个对象表示web app本身
const app = new Koa();
app.use(async(ctx,next)=>{
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
app.use(bodyParser);
app.use(controller());
app.listen(2000);
console.log('app started at port 3000...');

