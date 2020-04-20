
import { IStoreState } from '../types/index';

import { createStore, applyMiddleware, StoreEnhancer } from 'redux';
import reducers from '../reducers/index';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
declare global {
    interface Window { __INITIAL_STATE__: any; }
}
import { persistStore, persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['mockResource'],
};

const reducer =  typeof window != 'undefined' && window.document ?window.__INITIAL_STATE__:{}
const persistedReducer = persistReducer(persistConfig, reducers )
let ApplyMiddleware:StoreEnhancer<{ dispatch: unknown; }, {}>

if(JSON.stringify(process.argv).indexOf('debug')>0){
    ApplyMiddleware = applyMiddleware(thunk,logger)
}else{
    ApplyMiddleware = applyMiddleware(thunk)
}

export const store = createStore(persistedReducer, reducer,ApplyMiddleware) //客户端


export const persistor = persistStore(store);

export const mapMergeProps = (state: Object, dispatch: Object, props: Object) =>
    Object.assign({}, props, state, dispatch);

export const mapStateToProps = (store: IStoreState) => ({ store });
