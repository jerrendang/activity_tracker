import Cookies from 'js-cookie';

export const csrfFetch = async (url, options = {}) => {
    options.method = options.method || 'GET';
    options.headers = options.headers || {};

    if (options.method.toUpperCase() !== 'GET'){
        options.headers['Content-Type'] = 
            options.headers['Content-Type'] || 'application/json';
        options.headers['XSRF-Token'] = Cookies.get('XSRF-Token');
    }

    console.log('/////////////////////////////////////////////////////////')
    console.log('url:', url)
    console.log('/////////////////////////////////////////////////////////')

    const res = await fetch(url, options);


    console.log(res);

    if (res.status >= 400) throw res;

    return res;
}

export const restoreCSRF = () => {
    return csrfFetch('/api/csrf/restore');
}