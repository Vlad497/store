import { makeAutoObservable } from "mobx";

export default class ArtworkStore {
    constructor() {
        this._types = [];
        this._authors = [];
        this._artworks = [];
        this._selectedType = {};
        this._selectedAuthor = {};
        this._page = 1;
        this._totalCount = 0;
        this._limit = 6;
        makeAutoObservable(this);
    }

    setSelectedType(selectedType) {
        this.setPage(1);
        this._selectedType = selectedType;
    }
    setSelectedAuthor(selectedAuthor) {
        this.setPage(1);
        this._selectedAuthor = selectedAuthor;
    }
    setTypes(types) {
        this._types = types;
    }
    setAuthors(authors) {
        this._authors = authors;
    }
    setArtworks(artworks) {
        this._artworks = artworks;
    }
    setPage(page) {
        this._page = page;
    }
    setTotalCount(totalCount) {
        this._totalCount = totalCount;
    }

    get types() {
        return this._types;
    }
    get authors() {
        return this._authors;
    }
    get artworks() {
        return this._artworks;
    }
    get selectedType() {
        return this._selectedType;
    }
    get selectedAuthor() {
        return this._selectedAuthor;
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
