import axios from 'axios'

const API_URL = 'http://localhost:5000/api/auth';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(API_URL + "/register", userData,{
            withCredentials:true
        });
        return response.data;
    } catch (error) {
        console.error('API Error: User registration failed', error);
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw new Error('An unexpected error occurred during registration.');
        }
    }
}

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(API_URL + "/login", credentials,{
            withCredentials:true
        });
        return response.data;
    } catch (error) {
        console.error('API Error: User login failed', error);

        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw new Error('An unexpected error occurred during login.');
        }
    }
}

export const getMe = async() => {
    try{
        const response = await axios.get(API_URL + "/me" , {
            withCredentials:true
        });
        return response.data;
    } catch (error) {
        if(error.response && error.response.data){
            throw error.response.data;
        } else {
            throw new Error('An unexpected error occurred.');
        }
    }
}

export const logoutUser = async() => {
    try {
        const response = await axios.post(API_URL + '/logout',{} , {
            withCredentials:true
        });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw error.response.data;
        } else {
            throw new Error('An unexpected error occurred during logout.');
        }
    }
}