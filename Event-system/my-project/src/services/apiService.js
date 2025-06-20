class ApiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.token = localStorage.getItem('jwtToken');
    }

    setToken(token) {
        this.token = token;
        localStorage.setItem('jwtToken', token);
    }

    async get(endpoint) {
        try {
            const response = await fetch(`${ this.baseUrl }${ endpoint }`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${ this.token }`,
                },
            });
            return await response.json();
        } catch (error) {
            console.error('GET request error:', error);
            throw error;
        }
    }

    async post(endpoint, data) {
        console.log('post request to:', `${ this.baseUrl }${ endpoint }`);
        console.log(JSON.stringify(data))
        try {
            const response = await fetch(`${ this.baseUrl }${ endpoint }`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ this.token }`,
                },
                body: JSON.stringify(data),
            });
            return await response;
        } catch (error) {
            console.error('POST request error:', error);
            throw error;
        }
    }

    async put(endpoint, data) {
        console.log('PUT request to:', `${ this.baseUrl }${ endpoint }`);
        console.log(JSON.stringify(data))

        try {
            // debugger
            const response = await fetch(`${ this.baseUrl }${ endpoint }`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${ this.token }`,
                },
                body: JSON.stringify(data),
            });
            return await response;
        } catch (error) {
            console.error('PUT request error:', error);
            throw error;
        }
    }

    async delete(endpoint) {
        try {
            const response = await fetch(`${ this.baseUrl }${ endpoint }`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${ this.token }`,
                },
            });
            return await response;
        } catch (error) {
            console.error('DELETE request error:', error);
            throw error;
        }
    }
}

const apiService = new ApiService('https:/localhost:7149');
export default apiService;
