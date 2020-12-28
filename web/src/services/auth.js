export const JWT_TOKEN = 'token';

export const isAuthenticated = () => localStorage.getItem(JWT_TOKEN) !== null;

export const getToken = () => localStorage.getItem(JWT_TOKEN);

export const login = token => {
    localStorage.setItem(JWT_TOKEN, token);
};

export const logout = () => {
    localStorage.removeItem(JWT_TOKEN);
};