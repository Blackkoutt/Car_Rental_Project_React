import axios, { AxiosInstance } from 'axios';
import { baseUrl } from '../environment/environment';
import CarData from '../models/car-data';

class CarService {
    private api: AxiosInstance;
    private url:string = "/cars";
    constructor() {
      this.api = axios.create({
        baseURL: baseUrl,
      });
    }
    async getCars() {
        try {
          const response = await this.api.get(this.url);
          return response.data;
        } catch (error) {
          console.error('Błąd przy wysyłaniu żądania GET:', error);
          throw error;
        }
    }
    // tutaj zmiana potem na CarData
    async postCar(car:CarData) {
        try {
          const response = await this.api.post(this.url, car);
          return response.data;
        } catch (error) {
          console.error('Błąd przy wysyłaniu żądania POST:', error);
          throw error;
        }
    }
    async patchCar(carId:number, data:object) {
        try {
          const response = await this.api.patch(`${this.url}/${carId}`, data);
          return response.data;
        } catch (error) {
          console.error('Błąd przy wysyłaniu żądania PATCH:', error);
          throw error;
        }
    }
    async updateCar(car:CarData) {
        try {
          const response = await this.api.put(`${this.url}/${car.Id}`, car);
          return response.data;
        } catch (error) {
          console.error('Błąd przy wysyłaniu żądania PUT:', error);
          throw error;
        }
    }
    async getOneCar(carId:number) {
        try {
          const response = await this.api.get(`${this.url}/${carId}`);
          return response.data;
        } catch (error) {
          console.error('Błąd przy wysyłaniu żądania GET:', error);
          throw error;
        }
    }
    async deleteCar(carId?:number) {
        try {
          const response = await this.api.delete(`${this.url}/${carId}`);
          return response.data;
        } catch (error) {
          console.error('Błąd przy wysyłaniu żądania DELETE:', error);
          throw error;
        }
    }
}

export default new CarService();