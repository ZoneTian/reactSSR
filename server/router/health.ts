import * as Router from "koa-router";
import * as Koa from "koa";

const routeInfo = new Router({
    prefix: '/info'
})

const routeHealth = new Router({
    prefix: '/health'
})

routeInfo.get("*", (ctx:Koa.Context) => {
    ctx.type = 'application/json'
    ctx.body = {
        name: "SBFF",
        status: "UP"
    }
});

routeHealth.get('*', (ctx:Koa.Context) => {
    ctx.body = {
        description: "Sprint Cloud Eureka Descovery client",
        status: "UP",
        hystrix:{
            status: "UP"
        }
    }
});

export {
    routeInfo,
    routeHealth
}