import { makeAutoObservable } from "mobx";

export default class GalleryStore {
    constructor() {
        this._gallery = [];
        this._page = 1;
        this._totalCount = 0;
        this._limit = 4;
        makeAutoObservable(this);
    }

    setGallery(gallery) {
        this._gallery = gallery;
    }
    setPage(page) {
        this._page = page;
    }
    setTotalCount(totalCount) {
        this._totalCount = totalCount;
    }

    get gallery() {
        return this._gallery;
    }
    get page() {
        return this._page;
    }
    get totalCount() {
        return this._totalCount;
    }
    get limit() {
        return this._limit;
    }
}
