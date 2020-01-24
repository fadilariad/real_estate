import axios from 'axios';


class Api {
    constructor(model) {
        this.model = model;
    }
    async get(query){
        try {
            const result = await axios.get(`${this.model}${query && query}`);
            return (await result).data;
        }
        catch (e) {
            console.log(e);
        }
    }
    async post(path,params){
        try {
            const result = await axios.post(this.model,params);
            return result.data;
        }
        catch (e) {
            console.log(e);
        }
    }
    async put(path,params){
        try {
            const result = await axios.put(this.model,params);
            return result;
        }
        catch (e) {
            console.log(e);
        }
    }
    async delete(path,id){
        try {
            const result = await axios.delete(`${this.model}${id}`);
            return result
        }
        catch (e) {
            console.log(e);
        }
    }

}

export default Api;