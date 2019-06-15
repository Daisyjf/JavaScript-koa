//导入koa，在koa2中，我们导入的是一个class，因此用大写的Koa表示
const Koa = require('koa');
//require("koa-router")返回的是函数
const router = require("koa-router")();
const bodyParser = require("koa-bodyparser")();
//创建一个对象表示web app本身
const app = new Koa();
app.use(bodyParser);
app.use(async(ctx,next)=>{
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});
router.get('/hello/:name',async(ctx,next)=>{
    var name = ctx.params.name;
    ctx.response.body = "<h1>Hello ,"+name+"!</h1>";
});
router.get('/',async(ctx,next)=>{
    ctx.response.body = `<h1>Index</h1>
    <form action="/signin" method="post">
        <p>Name: <input name="name" value="koa"></p>
        <p>Password: <input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;
})
router.post('/singin',async(ctx,next)=>{
    var
        name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
})
app.use(router.routes());

//对于任何请求，app将调用该一步函数处理请求，ctx是由koa传入的封装的request和response的变量
//next是koa传入的将要处理的下一个异步函数
// app.use(async(ctx,next)=>{
//     //处理下一个异步函数，async标记函数为异步函数
//     await next();
//     //设置response的Content-Type
//     ctx.response.type = 'text/html';
//     //设置response的内容
//     ctx.response.body = '<h1>Hello ,koa2!</h1>';
// });

//在端口3000监听
app.listen(3000);
console.log('app started at port 3000...');
