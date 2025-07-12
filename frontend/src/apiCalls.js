import api from "./apiClient";

export const fetchPictures = async () => {
    const { data } = await api.get('/');
    return data
}