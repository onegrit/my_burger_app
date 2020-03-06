import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './store/reducer'

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

// MiddleWare示例
const logger = store => {
    // next是一个function
    return next => {
        return action => {
            console.log('[Middleware] dispatching', action);
            // 理论上这里是可以修改action的
            const result = next(action)
            console.log('[Middleware] next state', store.getState());

            return result
        }
    }
}


ReactDOM.render(app, document.getElementById('root'));


serviceWorker.unregister();
