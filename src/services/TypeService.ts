import axios, { AxiosInstance } from 'axios';
import { baseUrl } from '../environment/environment';

class TypeService {
    private api: AxiosInstance;
    private url:string = "/types";
    constructor() {
      this.api = axios.create({
        baseURL: baseUrl,
      });
    }
    async getTypes() {
        try {
          const response = await this.api.get(this.url);
          return response.data;
        } catch (error) {
          console.error('Błąd przy wysyłaniu żądania GET:', error);
          throw error;
        }
    }
}

export default new TypeService();