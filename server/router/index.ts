/**
 * 路由
 */
import * as Router from "koa-router";
import * as Koa from "koa";

/**
 * master Router
 */
const router = new Router({
    prefix: '/sms'
})

router.all('/*', async (ctx: Koa.Context) => {
    ctx.body = "default obligate api"
})

export default router