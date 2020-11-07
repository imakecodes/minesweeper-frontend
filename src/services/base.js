import axios from 'axios';

export const getResponseData = response => response.data;

export class RestClient {
  constructor() {
    this.client = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
