import * as React from 'react';
import { hydrate } from 'react-dom';

// const store = configureStore();

// import * as React from 'react';
// import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { store, persistor } from './store/configureStore';

// import { ConfigProvider } from 'antd';
// import zhCN from 'antd/lib/locale-provider/zh_CN';
// // import 'antd/dist/antd.css';

import App from './App';
import { store, persistor } from './store/configureStore';

 
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
hydrate(
    <Provider store={store}>
       <PersistGate persistor={persistor}>
        <BrowserRouter>
            <App />
        </BrowserRouter> 
        </PersistGate>  ,  
     </Provider>,
    document.getElementById('root') as HTMLElement,
);
