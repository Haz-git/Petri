//Dependencies:
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { saveState, getState } from './utils/localstorage';
import throttle from 'lodash/throttle';

//Components
import App from './components/App';
import {store, persistor} from '../src/redux/store';

//Normalize CSS
import 'normalize.css';

//Subscribe state to localstorage:
store.subscribe(throttle(() => {
    saveState(store.getState());
}, 1000));

render(
    <Provider store={ store }>
        <PersistGate persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

