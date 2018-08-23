import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router/AppRouter';
import './styles/styles.scss';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers/store';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <AppRouter />
    </Provider>
, document.getElementById('index'));