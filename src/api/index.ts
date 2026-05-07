import apiClient from "./apiClient";

export const getDogs = () => {
    return apiClient.get('/breeds');
}

export const getDogDetail = (dogId: string) => {
    return apiClient.get(`/breeds/${dogId}`);
}
export const getEvents=()=>{
    return apiClient.get('/events');
}