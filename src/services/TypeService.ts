import axios, { AxiosInstance, AxiosResponse } from "axios";
import { baseUrl } from "../environment/environment";

class TypeService {
  private api: AxiosInstance;
  private url: string = "/types";
  constructor() {
    this.api = axios.create({
      baseURL: baseUrl
    });
  }
  async getTypes(): Promise<any> {
    try {
      const response: AxiosResponse<any, any> = await this.api.get(this.url);
      return response.data;
    } catch (error) {
      console.error("Błąd przy wysyłaniu żądania GET:", error);
      throw error;
    }
  }
}
const typeServiceInstance = new TypeService();
export default typeServiceInstance;
