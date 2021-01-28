import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
// import App from './demo-fb/auth/App'
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
import store from "./store/store";
import { BrowserRouter  } from 'react-router-dom';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

serviceWorker.unregister();
