import { $authHost, $host } from "./index";

export const createType = async (type) => {
    const { data } = await $authHost.post('api/type', type);
    return data;
}

export const fetchTypes = async () => {
    const { data } = await $host.get('api/type');
    return data;
}

export const deleteType = async (id) => {
    const { data } = await $authHost({ method: 'DELETE', url: 'api/type/' + id });
    return data;
}

export const createAuthor = async (author) => {
    const { data } = await $authHost.post('api/author', author);
    return data;
}

export const fetchAuthors = async () => {
    const { data } = await $host.get('api/author');
    return data;
}

export const deleteAuthor = async (id) => {
    const { data } = await $authHost({ method: 'DELETE', url: 'api/author/' + id });
    return data;
}

export const createArtwork = async (author) => {
    const { data } = await $authHost.post('api/artwork', author);
    return data;
}

export const fetchArtwork = async (typeId, authorId, page, limit = 6) => {
    const { data } = await $host.get('api/artwork', {
        params: {
            typeId, authorId, page, limit
        }
    });
    return data;
}

export const fetchOneArtwork = async (id) => {
    const { data } = await $host.get(`api/artwork/${id}`);
    return data;
}

export const fetchDeleteArtwork = async (id) => {
    const { data } = await $authHost({ method: 'DELETE', url: `api/artwork/${id}` });
    return data;
}

export const updateArtworks = async (id, body) => {
    const { data } = await $authHost({ method: 'PUT', url: `api/artwork/${id}`, data: body });
    return data;
}

export const getAllArtworksInAdminPage = async (name, page = 1, filter = "All") => {
    const { data } = await $authHost({ method: 'GET', url: `api/artwork/search?page=${page}&name=${name}&filter=${filter}` });
    return data;
}

export const addArtworkToBasket = async (artwork) => {
    const { data } = await $authHost.post('api/basket', artwork);
    return data;
}

export const getArtworkFromBasket = async () => {
    const { data } = await $authHost.get('api/basket');
    return data;
}

export const deleteArtworkFromBasket = async (id) => {
    const { data } = await $authHost.delete(`api/basket/${id}`);
    return data;
}

