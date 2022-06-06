import { $authHost, $host } from "./index";

export const createNews = async (author) => {
    const { data } = await $authHost.post('api/news/newsOne', author);
    return data;
}

export const getAllNewsInAdminPage = async (name, page = 1, filter = "All") => {
    const { data } = await $authHost({ method: 'GET', url: `api/news/newsOne/search?page=${page}&name=${name}&filter=${filter}` });
    return data;
}

export const fetchDeleteNews = async (id) => {
    const { data } = await $authHost({ method: 'DELETE', url: `api/news/newsOne/${id}` });
    return data;
}

export const updateNews = async (id, body) => {
    const { data } = await $authHost({ method: 'PUT', url: `api/news/newsOne/${id}`, data: body });
    return data;
}

export const fetchOneNews = async (id) => {
    const { data } = await $host.get(`api/news/newsOne/${id}`);
    return data;
}

export const fetchNews = async (page, limit = 4) => {
    const { data } = await $host.get('api/news/newsOne', {
        params: {
            page, limit
        }
    });
    return data;
}