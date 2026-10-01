const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_URL = (() => {
    let url = rawUrl.trim();
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    if (!url.endsWith('/api')) {
        url = `${url}/api`;
    }
    return url;
})();
