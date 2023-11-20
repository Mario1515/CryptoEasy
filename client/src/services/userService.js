import * as request from "./requester";

const baseUrl = 'http://localhost:3030/users';

export const register = (data) =>  request.post(`${baseUrl}/register`, data);

export const login = (data) =>  request.post(`${baseUrl}/login`, data);

export const logout = async (accessToken) => {
    try {
        const response = await fetch(`${baseUrl}/logout`, {
            headers: {
                'X-Authorization': accessToken
            }
        });

        return response;
    } catch (error) {
        console.log(error);
    }
};

