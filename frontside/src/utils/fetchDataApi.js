import axios from 'axios';

export const getDataApi = async (url, token) => {
    try {
        const res = await axios.get(`/api/${url}`, {
            headers:{Authorization: token}
        })
        return res;
    } catch (err) {
        console.error(`Error in getDataApi: ${err.message}`);
        throw err;
    }
}

export const postDataApi = async (url, post, token) => {
    try {
        const res = await axios.post(`/api/${url}`, post, {
            headers: { Authorization: token },
        });
        return res;
    } catch (err) {
        console.error(`Error in postDataApi: ${err.message}`);
        throw err;
    }
}

export const putDataApi = async (url, post, token) => {
    try {
        const res = await axios.put(`/api/${url}`, post, {
            headers:{Authorization: token}
        })
        return res;
    } catch (err) {
        console.error(`Error in putDataApi: ${err.message}`);
        throw err;
    }
}

export const patchDataApi = async (url, post, token) => {
    try {
        const res = await axios.patch(`/api/${url}`, post, {
            headers:{Authorization: token}
        })
        return res;
    } catch (err) {
        console.error(`Error in patchDataApi: ${err.message}`);
        throw err;
    }
}

export const deleteDataApi = async (url, token) => {
    const res = await axios.delete(`/api/${url}`, {
        headers:{Authorization: token}
    })
    return res;
}