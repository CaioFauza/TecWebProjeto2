import React from 'react';
import ReactDOM from 'react-dom';
import {PersistGate} from 'redux-persist/integration/react'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import { store, persistor } from './modules/store';

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading = {null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>, document.getElementById('root'));

serviceWorker.unregister();



