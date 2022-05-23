import { makeAutoObservable } from "mobx";
import { deleteArtworkFromBasket } from "../http/artworkAPI";

export default class BasketStore {
    constructor() {
        this._totalPrice = 0;
        this._basket = [];
        makeAutoObservable(this);
    }

    async setDeleteItemBasket(artwork, isAuth = false) {
        if (isAuth) {
            await deleteArtworkFromBasket(artwork.id).then(() => {
                this._basket = this._basket.filter(item => item.id !== artwork.id);
                this._totalPrice -= artwork.price * artwork.count;
            });
        } else {
            this._basket = this._basket.filter(item => item.id !== artwork.id);
            this._totalPrice -= artwork.price * artwork.count;

            localStorage.setItem("basket", JSON.stringify(this._basket));
        }
    }

    setBasket(item, isAuth = false) {
        const checkArtworkInBasket = this._basket.findIndex(artwork => artwork.id === item.id);
        if (checkArtworkInBasket < 0) {
            this._basket = [...this._basket, { count: 1, ...item }];
            let totalPrice = 0;
            this._basket.forEach(artwork => totalPrice += Number(artwork.price * artwork.count));
            this._totalPrice = totalPrice;
        }

        if (!isAuth) {
            localStorage.setItem("basket", JSON.stringify(this._basket));
        }
    }

    setDeleteAllArtworkFromBasket() {
        this._totalPrice = 0;
        return this._basket = [];
    }

    setCountArtwork(artworkId, action, isAuth = false) {
        const itemInd = this._basket.findIndex(item => item.id === artworkId);
        const itemInState = this._basket.find(artwork => artwork.id === artworkId);
        if (action === "+") {
            const newItem = {
                ...itemInState,
                count: ++itemInState.count
            }
            this._basket = [...this._basket.slice(0, itemInd), newItem, ...this._basket.slice(itemInd + 1)]
        } else {
            const newItem = {
                ...itemInState,
                count: itemInState.count === 1 ? 1 : --itemInState.count
            }
            this._basket = [...this._basket.slice(0, itemInd), newItem, ...this._basket.slice(itemInd + 1)]
        }

        if (!isAuth) {
            localStorage.setItem("basket", JSON.stringify(this._basket));
        }

        let totalPrice = 0;
        this._basket.forEach(artwork => totalPrice += Number(artwork.price * artwork.count));
        this._totalPrice = totalPrice;
    }

    resetBasket() {
        this._basket = [];
        this._totalPrice = 0;
        localStorage.removeItem('basket');
    }


    get Basket() {
        return this._basket;
    }

    get Price() {
        return this._totalPrice;
    }
}
