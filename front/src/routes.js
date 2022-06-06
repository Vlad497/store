import {
    ADMIN_ROUTE,
    BASKET_ROUTE, ARTWORK_EDIT_ROUTE,
    ARTWORK_ROUTE,
    LOGIN_ROUTE, ORDERING_ROUTE,
    ORDERS_ROUTE,
    REGISTRATION_ROUTE,
    SHOP_ROUTE,
    NEWS_ROUTE,
    NEWS_PAGE_ROUTE,
    NEWS_ADMIN_ROUTE,
    NEWS_EDIT_ROUTE,
    GALLERY_ROUTE,
    GALLERY_PAGE_ROUTE,
    GALLERY_ADMIN_ROUTE,
    GALLERY_EDIT_ROUTE,
} from './utils/consts';

import Admin from "./pages/Admin";
import Orders from "./pages/Orders";
import Shop from "./pages/Shop";
import Auth from "./pages/Auth";
import ArtworkPage from "./pages/ArtworkPage";
import BasketCard from "./pages/BasketCard";
import News from "./pages/News";
import NewsPage from "./pages/NewsPage";
import NewsPageAdmin from "./pages/NewsPageAdmin";
import NewsPageEdit from "./pages/NewsPageEdit";
import OneOrder from "./pages/OneOrder";
import ArtworkPageEdit from "./pages/ArtworkPageEdit";
import Ordering from "./pages/Ordering";
import GalleryPageAdmin from "./pages/GalleryPageAdmin";
import GalleryPageEdit from "./pages/GalleryPageEdit";
import Gallery from "./pages/Gallery";
import GalleryPage from "./pages/GalleryPage";

export const authRouters = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: NEWS_ADMIN_ROUTE,
        Component: NewsPageAdmin
    },
    {
        path: GALLERY_ADMIN_ROUTE,
        Component: GalleryPageAdmin
    },
    {
        path: ORDERS_ROUTE,
        Component: Orders
    },
    {
        path: ORDERS_ROUTE + '/:id',
        Component: OneOrder
    },
    {
        path: ARTWORK_EDIT_ROUTE + '/:id',
        Component: ArtworkPageEdit
    },
    {
        path: NEWS_EDIT_ROUTE + '/:id',
        Component: NewsPageEdit
    },
    {
        path: GALLERY_EDIT_ROUTE + '/:id',
        Component: GalleryPageEdit
    },

];

export const publicRouters = [
    {
        path: ORDERING_ROUTE,
        Component: Ordering
    },
    {
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: ARTWORK_ROUTE + '/:id',
        Component: ArtworkPage
    },
    {
        path: BASKET_ROUTE,
        Component: BasketCard
    },
    {
        path: NEWS_ROUTE,
        Component: News
    },
    {
        path: NEWS_ROUTE + NEWS_PAGE_ROUTE + '/:id',
        Component: NewsPage
    },
    {
        path: GALLERY_ROUTE,
        Component: Gallery
    },
    {
        path: GALLERY_ROUTE + GALLERY_PAGE_ROUTE + '/:id',
        Component: GalleryPage
    },
];
