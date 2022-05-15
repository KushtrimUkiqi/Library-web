import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';


import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import categoriesReducer  from './state/Categories';
import bookPagesReducer from './state/BookPages';
import authReducer from './state/UserAuth'

const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        bookPages: bookPagesReducer,
        auth: authReducer
    }   
});

const container = document.getElementById('root');

const root = createRoot(container);

root.render(
    <Provider store={store}>
        <App/>
    </Provider>    
);

