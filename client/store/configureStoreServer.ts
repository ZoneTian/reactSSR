

import { createStore, applyMiddleware, StoreEnhancer } from 'redux';
import reducers from '../reducers/index';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
declare global {
    interface Window { __INITIAL_STATE__: any; }
}

let ApplyMiddleware:StoreEnhancer<{ dispatch: unknown; }, {}>

if(JSON.stringify(process.argv).indexOf('debug')>0){
    ApplyMiddleware = applyMiddleware(thunk,logger)
}else{
    ApplyMiddleware = applyMiddleware(thunk)
}
export function configureStore(preLoadedState:any) { //服务端 


    const store = createStore(
        reducers,
        preLoadedState,
        ApplyMiddleware
    );
    return store;
}



