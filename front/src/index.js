import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import UserStore from "./store/UserStore";
import ArtworkStore from "./store/ArtworkStore";
import BasketStore from "./store/BasketStore";
import NewsStore from "./store/NewsStore";
import GalleryStore from "./store/GalleryStore";

export const Context = createContext(null);

ReactDOM.render(
    <Context.Provider value={
        {
            user: new UserStore(),
            artwork: new ArtworkStore(),
            basket: new BasketStore(),
            news: new NewsStore(),
            gallery: new GalleryStore(),
        }
    }>
        <App />
    </Context.Provider>,
    document.getElementById('root')
);
