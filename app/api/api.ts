import request from "superagent";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

const api = {
    get: (url: string, {params, headers}: any = {}) => {
        let req = request.get(url).withCredentials();  

        if(params) {
            req = req.query(params);
        }
        if(headers) {
            req = req.set(headers);
        }
        return req;
    },

    post: (url: string, data?: any, { headers }: any = {}) => {
        let req = request.post(url).send(data).withCredentials();

        if(headers) {
            req = req.set(headers);
        }

        console.log(req);
        return req;
    },
        
    put: (url: string, data?: any, {headers}: any = {}) => {
        let req = request.put(url).send(data).withCredentials();

        if(headers) {
            req = req.set(headers);
        }
        return req;
    },
    patch: (url: string, data?: any, {headers}: any = {}) => {  

        let req = request.patch(url).send(data).withCredentials();

        if(headers) { 
            req = req.set(headers);
        }
        return req;
    },
    delete: (url: string, { headers }: any = {}) => {
        let req = request.delete(url).withCredentials();

        if(headers) {
            req = req.set(headers);
        }
        return req;
    }
};

export default api;
