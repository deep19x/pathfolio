import api from './api'

export const getLocation = async(tripId) => {
    try {
        const response = await api.get(`/trip/${tripId}/locations`);
        return response.data;
    } catch (error) {
        if(error.response && error.response.data){
            throw error.response.data;
        }else {
            throw new Error('Unexpected Error');
        }
    }
}

export const createLocation = async(tripId,locationData) => {
    try {
        const response = await api.post(`/trip/${tripId}/locations`,locationData);
        return response.data;
    } catch (error) {
        if(error.response && error.response.data){
            throw error.response.data;
        }else{
            throw new Error('Unexpected Error');
        }
    }
}

export const deleteLocation = async(tripId) => {
    try {
        const response = await api.delete(`/trip/${tripId}/locations`);
        return response.data;
    } catch (error) {
        if(error.response && error.response.data){
            throw error.response.data;
        }else{
            throw new Error('Unexpected Error');
        }
    }
}

export const updateLocation = async(tripId,locationId,data) => {
    try {
        const response = await api.put(`/trip/${tripId}/locations/${locationId}`,data);
        return response.data;
    } catch (error) {
        if(error.response && error.response.data){
            throw error.response.data;
        } else {
            throw new Error("Unexpected Error");
        }
    }
}