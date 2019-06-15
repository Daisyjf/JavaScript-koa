//导入koa，在koa2中，我们导入的是一个class，因此用大写的Koa表示
const Koa = require('koa');
//创建一个对象表示web app本身
const app = new Koa();
//对于任何请求，app将调用该一步函数处理请求，ctx是由koa传入的封装的request和response的变量
//next是koa传入的将要处理的下一个异步函数
app.use(async(ctx,next)=>{
    //处理下一个异步函数，async标记函数为异步函数
    await next();
    //设置response的Content-Type
    ctx.response.type = 'text/html';
    //设置response的内容
    ctx.response.body = '<h1>Hello ,koa2!</h1>';
});
app.use(async (ctx, next) => {
    console.log('第一1');
    await next(); // 调用下一个middleware
    console.log('第一2');
});

app.use(async (ctx, next) => {
    console.log('第二1');
    await next(); // 调用下一个middleware
    console.log('第二2');
});

app.use(async (ctx, next) => {
    console.log('第三1');
    await next();
    console.log('第三2');
});
//在端口3000监听
app.listen(3000);
console.log('app started at port 3000...');
