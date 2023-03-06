export const Connection = () => {

    const customFetch = async (endpoint, options) => {

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

        return await fetch(endpoint, options)
            .then((res) => res.ok ? res.json() : Promise.reject({
                    err: true,
                    status: res.status || "000",
                    statusText: res.statusText || "Error"
                })
            .catch((err) => err));
        }        
       

    const get = async (url, options = {}) => {
        return await customFetch(url, options);
    };

    const post = async (url, options = {}) => {
        options.method = "POST";
        return await customFetch(url, options);
    };
    
    const put = async (url, options = {}) => {
        options.method = "PUT";
        return await customFetch(url, options);
    };
    
    const del = async (url, options = {}) => {
        options.method = "DELETE";
        return await customFetch(url, options);
    };

    return {
        get,
        post,
        put,
        del
    }
}