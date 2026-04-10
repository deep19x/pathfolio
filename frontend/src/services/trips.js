import api from './api'

export const getTrips = async () => {
    try {
        const response = await api.get('/trip')
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data
        } else {
            throw new Error('Failed to fetch trips')
        }
    }
}

export const createTrip = async (tripData,image) => {
    try {
        const formData = new FormData();
        const { image: _, ...cleanData } = tripData;

        Object.keys(tripData).forEach(key => {
            formData.append(key,tripData[key]);
        });

        if(image){
            formData.append("image",image);
        }
        const response = await api.post('/trip', formData)
        return response.data
    } catch (error) {
        console.log("FULL ERROR:", error);   // 🔥 ADD THIS

    if (error.response && error.response.data) {
        console.log("BACKEND ERROR:", error.response.data); // 🔥 ADD
        throw error.response.data
    } else {
        throw new Error('Failed to create trip')
    }
    }
}

export const deleteTrip = async (id) => {
    try {
        const response = await api.delete(`/trip/${id}`)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data
        } else {
            throw new Error('Failed to delete trip')
        }
    }
}

export const editTrip = async (id, tripData,image) => {
    try {
        const formData = new FormData();
        const { image: _, ...cleanData } = tripData;

        Object.keys(tripData).forEach((key) => {
            formData.append(key,tripData[key]);
        });

        if(image){
            formData.append("image",image);
        }
        const response = await api.put(`/trip/${id}`, formData)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data
        } else {
            throw new Error('Failed to update trip')
        }
    }
}

export const getPublicTrips = async() => {
    try {
        const response = await api.get('/trip/public');
        return response.data;
    } catch (error) {
        if(error.response && error.response.data){
            throw error.response.data
        } else {
            throw new Error('Failed to fetch');
        }
    }
}

export const getSingleTrip = async(id) => {
    try {
        const response = await api.get(`/trip/${id}`);
        return response.data;
    } catch (error) {
        if(error.response && error.response.data){
            throw error.response.data
        } else {
            throw new Error('Failed to fetch');
        }
    }
}