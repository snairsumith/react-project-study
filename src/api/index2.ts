import apiClient from "./apiClient";

const getAllBreeds = () => {
    return apiClient.get('/breeds');
}

export { getAllBreeds };