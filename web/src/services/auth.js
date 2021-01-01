export const JWT_TOKEN = 'token';
export const USER_ID = 'userId';

export const isAuthenticated = () => localStorage.getItem(JWT_TOKEN) !== null;

export const getToken = () => localStorage.getItem(JWT_TOKEN);

export const getUserId = () => localStorage.getItem(USER_ID);

export const login = (token, userId) => {
    localStorage.setItem(JWT_TOKEN, token);
    localStorage.setItem(USER_ID, userId);
};

export const logout = () => {
    localStorage.removeItem(JWT_TOKEN);
    localStorage.removeItem(USER_ID);
};