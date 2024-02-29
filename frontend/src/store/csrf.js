import Cookies from 'js-cookie';

export const csrfFetch = async (url, options = {}) => {
    options.method = options.method || 'GET';
    options.headers = options.headers || {};

    if (options.method.toUpperCase() !== 'GET'){
        options.headers['Content-Type'] = 
            options.headers['Content-Type'] || 'application/json';
        options.headers['XSRF-Token'] = Cookies.get('XSRF-Token');
    }

    url = process.env.NODE_ENV === 'production' ? 'https://activity-tracker-app-uty0.onrender.com' + url : 'http://localhost:8000' + url

    const res = await fetch(url, options);

    if (res.status >= 400) {
        throw await res.json();
    };

    return res;
}

export const restoreCSRF = () => {
    return csrfFetch('/api/csrf/restore');
}