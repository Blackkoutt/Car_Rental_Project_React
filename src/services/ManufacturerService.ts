import axios, { AxiosInstance } from 'axios';
import { baseUrl } from '../environment/environment';

class ManufacturerService {
    private api: AxiosInstance;
    private url:string = "/manufacturers";
    constructor() {
      this.api = axios.create({
        baseURL: baseUrl,
      });
    }
    async getManufacturers() {
        try {
          const response = await this.api.get(this.url);
          return response.data;
        } catch (error) {
          console.error('Błąd przy wysyłaniu żądania GET:', error);
          throw error;
        }
    }
}

export default new ManufacturerService();