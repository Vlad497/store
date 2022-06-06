import { $authHost, $host } from "./index";

export const createGallery = async (author) => {
    const { data } = await $authHost.post('api/gallery/galleryOne', author);
    return data;
}

export const getAllGalleryInAdminPage = async (name, page = 1, filter = "All") => {
    const { data } = await $authHost({
        method: 'GET', url: `api/gallery/galleryOne/search?page=${page}&name=${name}&filter=${filter}`
    });
    return data;
}

export const fetchDeleteGallery = async (id) => {
    const { data } = await $authHost({ method: 'DELETE', url: `api/gallery/galleryOne/${id}` });
    return data;
}

export const updateGallery = async (id, body) => {
    const { data } = await $authHost({ method: 'PUT', url: `api/gallery/galleryOne/${id}`, data: body });
    return data;
}

export const fetchOneGallery = async (id) => {
    const { data } = await $host.get(`api/gallery/galleryOne/${id}`);
    return data;
}

export const fetchGallery = async (page, limit = 4) => {
    const { data } = await $host.get('api/gallery/galleryOne', {
        params: {
            page, limit
        }
    });
    return data;
}