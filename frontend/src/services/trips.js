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

export const createTrip = async (tripData) => {
    try {
        const response = await api.post('/trip', tripData)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
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

export const editTrip = async (id, tripData) => {
    try {
        const response = await api.put(`/trip/${id}`, tripData)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data
        } else {
            throw new Error('Failed to update trip')
        }
    }
}