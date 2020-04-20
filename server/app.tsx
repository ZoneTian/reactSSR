import * as Koa from 'koa';
import * as bodyparser from 'koa-bodyparser';
import * as compress from 'koa-compress';
import * as serve from 'koa-static';
import * as Router from 'koa-router';
import * as loader from './loader';
import * as path from 'path';
import * as React from 'react';
import * as pug from 'pug';

import { renderToString } from 'react-dom/server';
import { matchPath, StaticRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { IResouceList } from '../client/routes/routesConfigure';
import { configureStore } from '../client/store/configureStoreServer'; //服务Î端创建store 不实用redux-persist
import { routeInfo, routeHealth } from './router/health';

import routes from '../client/routes/routes';
import EnvConf from './loader/env.configuration';
import App from '../client/App';
import getSyncFetch from '../client/lib/getSyncFetch';
import router from './router';


const log4 = loader.log4jsInitial();

const envConfiguration = new EnvConf(process.env.RUN_ENV || 'product');
const roots = new Router();
const RENDER_PATN = path.resolve('./');

//生成一个Koa实例
const app = new Koa();
app.use(bodyparser()) //解析
    .use(compress()) //压缩
    .use(serve('./public')) //处理静态资源
    .use(roots.routes()) //启动路由
    .use(roots.allowedMethods()) //官方文档推荐用法，我们可以看到allowedMethods 用在了路由匹配之后，此时可以根据 ctx.status 设置 response 响应头
    .use(router.routes())
    .use(router.allowedMethods())
    .use(routeInfo.routes())
    .use(routeInfo.allowedMethods())
    .use(routeHealth.routes())
    .use(routeHealth.allowedMethods());
//生成了4个路由实例，用于路由分发。
roots.get('/*', async (ctx: Koa.Context) => {
    let _data: IResouceList | undefined;
    routes.some((routes) => {
        const match = matchPath(ctx.path, routes);
        if (match) {
            _data =
                routes.getAsyncResource &&
                routes.getAsyncResource({
                    cookie: ctx.req.headers.cookie,
                    timeout: 3000,
                    restfulUrl: envConfiguration.commEnvConfig.RESTFULURL,
                });
        }
        return match;
    });
    async function datas(_data: IResouceList) {
        return new Promise((resolve) => {
            try {
                getSyncFetch({ FetchList: _data.fetchList, cookie: ctx.req.headers.cookie }).then((data: any) => {
                    let preLoadedState = {};
                    for (const i in data.fetchResponse) {
                        preLoadedState = Object.assign(preLoadedState, { [i]: data.fetchResponse[i] });
                    }
                    resolve({ [_data.asycnKey]: preLoadedState });
                });
            } catch (error) {
                log4.getLogger().info(error)
                resolve({});
            }
        });
    }
    const preLoadedState = _data && (await datas(_data)); //获取同步所需数据，并存入 store

    const store = configureStore(preLoadedState); //生成 store
    // SSR
    const HTML = renderToString(
        <Provider store={store}>
            <StaticRouter location={ctx.request.url} context={{}}>
                <App />
            </StaticRouter>
        </Provider>,
    );

    const __INITIAL_ENV__ = envConfiguration.commEnvConfig; //环境变量注入
    const bundle = `/static/bundle/${__INITIAL_ENV__.RUN_ENV}.bundle.js`; //打包 js 注入
    const compiledFunction = pug.compileFile(`${RENDER_PATN}/server/views/base.pug`); //页面模版
    const __INITIAL_STATE__ = store.getState();
    //渲染生成初始页面
    ctx.body = compiledFunction({
        __INITIAL_ENV__,
        __INITIAL_STATE__,
        HTML,
        bundle,
    });
});

export default app;
