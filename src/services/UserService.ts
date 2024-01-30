import axios, { AxiosInstance } from 'axios';
import { baseUrl } from '../environment/environment';
import UserData from '../models/user';


class UserService {
    private api: AxiosInstance;
    private url:string = "/users";
    constructor() {
      this.api = axios.create({
        baseURL: baseUrl,
      });
    }
    async getUsers() {
        try {
          const response = await this.api.get(this.url);
          return response.data;
        } catch (error) {
          console.error('Błąd przy wysyłaniu żądania GET:', error);
          throw error;
        }
    }
    async postUser(user:UserData) {
        try {
          const response = await this.api.post(this.url, user);
          return response.data;
        } catch (error) {
          console.error('Błąd przy wysyłaniu żądania POST:', error);
          throw error;
        }
    }
    async getOneUser(userId:number) {
        try {
          const response = await this.api.get(`${this.url}/${userId}`);
          return response.data;
        } catch (error) {
          console.error('Błąd przy wysyłaniu żądania GET:', error);
          throw error;
        }
    }
    async getUser(email:string) {
        try {
          const response = await this.api.get(`${this.url}/${email}`);
          return response.data;
        } catch (error) {
          console.error('Błąd przy wysyłaniu żądania GET:', error);
          throw error;
        }
    }
    async deleteUser(userId?:number) {
        try {
          const response = await this.api.delete(`${this.url}/${userId}`);
          return response.data;
        } catch (error) {
          console.error('Błąd przy wysyłaniu żądania DELETE:', error);
          throw error;
        }
    }
}

export default new UserService();