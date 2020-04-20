1. request 请求进来
2. 进入 Koa2 Application
3. 进入 Koa2 Middleware 中转
4. 获取当前路由的特征
5. 拿到路由特征后进行服务端接口请求
6. 校验请求结果
7. 请求结果处理后部署到window下
8. 获取客户端模块进行SSR
9. SSR组装
10. response