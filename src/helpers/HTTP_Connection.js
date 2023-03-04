export const Connection = () => {

    const customFetch = (endpoint, options) => {

        const defaultHeader = {
            "Content-Type": "application/json",
            "Accept": "application/json"
        };

        const controller = new AbortController();
        options.signal = controller.signal;

        options.method = options.method || "GET";

        options.headers = options.headers ? {...defaultHeader, ...options.headers} : defaultHeader;

        options.body = JSON.stringify(options.body) || false;
        if (!options.body) delete options.body;

        setTimeout(() => controller.abort(), 2000);

        return fetch(endpoint, options)
            .then((res) => res.ok ? res.json() : Promise.reject({
                    err: true,
                    status: res.status || "000",
                    statusText: res.statusText || "Error"
                })
            .catch((err) => err));
        }        
       

    const get = (url, options = {}) => {
        return customFetch(url, options);
    };

    const post = (url, options = {}) => {
        options.method = "POST";
        return customFetch(url, options);
    };
    
    const put = (url, options = {}) => {
        options.method = "PUT";
        return customFetch(url, options);
    };
    
    const del = (url, options = {}) => {
        options.method = "DELETE";
        return customFetch(url, options);
    };

    return {
        get,
        post,
        put,
        del
    }
}