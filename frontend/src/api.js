const API_URL = 'http://localhost:9090/api';

export async function apiRequest(endpoint, options = {}) {
    const token = sessionStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
    };

    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.msg || 'Error en la petición');
    }

    return data;
}
