import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { createMemoryHistory,createBrowserHistory } from 'history';

import { layout } from './layout';
import { global } from './global';
import { seo } from './seo';
import  index  from './Props'; // 首页第一屏数据 //全部品牌页

const routerReducers = (_history?: any) => {
    let object = {
        layout,
        seo,
        index,
        global,
        routerReducer,
    };
    return combineReducers(object);
};

const reducers =
    typeof window != 'undefined' && window.document
        ? routerReducers(createBrowserHistory())
        : routerReducers(createMemoryHistory);

export default reducers;
