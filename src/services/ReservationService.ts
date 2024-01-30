import axios, { AxiosInstance } from 'axios';
import { baseUrl } from '../environment/environment';
import ReservationData from '../models/reservation';


class ReservationService {
    private api: AxiosInstance;
    private url:string = "/reservations";
    constructor() {
      this.api = axios.create({
        baseURL: baseUrl,
      });
    }
    async getReservations() {
        try {
          const response = await this.api.get(this.url);
          return response.data;
        } catch (error) {
          console.error('Błąd przy wysyłaniu żądania GET:', error);
          throw error;
        }
    }
    async postReservation(reservation:ReservationData) {
        try {
          const response = await this.api.post(this.url, reservation);
          return response.data;
        } catch (error) {
          console.error('Błąd przy wysyłaniu żądania POST:', error);
          throw error;
        }
    }
    async deleteReservation(reservationId?:number) {
        try {
          const response = await this.api.delete(`${this.url}/${reservationId}`);
          return response.data;
        } catch (error) {
          console.error('Błąd przy wysyłaniu żądania DELETE:', error);
          throw error;
        }
    }
}

export default new ReservationService();