// import React from 'react'
import Home from '../containers/Home';
import Myaccount from '../containers/Myaccount';
import getSingleCookie from '../lib/getSingleCookie';
import { ComponentClass } from 'react';

export interface IParams {
    cookie: any;
    timeout: number;
    restfulUrl?: string;
}

export interface IResouceList {
    asycnKey: string;
    fetchList: Array<IFetchList>;
}
export interface IFetchList {
    content: string;
    url: string;
    params: {
        method: string;
        headers?: object;
        body?: object;
        timeout?: number;
    };
}
interface IRouteList {
    path: string;
    component: ComponentClass<any, any>;
    getAsyncResource?: IAysncRoute;
    exact?: boolean;
}
interface IAysncRoute {
    (params: IParams): IResouceList;
}
type IRoutes = Array<IRouteList>;
/**
 * path
 * exact 如果在父路由中加了exact，是不能匹配子路由的,建议在子路由中加exact
 * component
 * getAsyncResource seo所需数据 @return [
 *      asycnKey : 该页面所使用的reducer的名字
 *      fetchList : 请求数组 [
 *              content:该接口所使用的recuer的名字
 *              url:接口请求的url
 *              param:接口参数
 *          ]
 *      ]
 * 
 */
const RoutesConfig: IRoutes = [
    {
        path: '/',
        exact: true,
        component: Home,
        getAsyncResource: (params: IParams): IResouceList => {
            const { cookie } = params;
            const UID = getSingleCookie({ cookies: cookie, value: 'UID' });
            const Token = getSingleCookie({ cookies: cookie, value: 'Token' });
            return {
                asycnKey: 'Index',
                fetchList: [
                    {
                        content: 'first',
                        url: 'http://' + params.restfulUrl + '/v2/marketing/homepage/first-section',
                        params: {
                            method: 'GET',
                            headers: {
                                UID: UID,
                                Token: Token,
                            },
                            body: {},
                            timeout: params.timeout,
                        },
                    },
                    {
                        content: 'BrandAllcon',
                        url: 'http://' + params.restfulUrl + '/v1/es/brandWall/queryAllBrands',
                        params: {
                            method: 'POST',
                            headers: {
                                UID: UID,
                                Token: Token,
                            },
                            body: {},
                            timeout: params.timeout,
                        },
                    },
                ],
            };
        },
    },
    {
        path: '/myaccount',
        component: Myaccount,
        // getAsyncResource: () => {},
    },
];
export default RoutesConfig;
