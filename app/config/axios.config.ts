// config/axios.config.ts
import axios from 'axios';

const url = process.env.NEXT_PUBLIC_API_BASE_URL;
// const url = 'http://192.168.172.153:8001/api/v1';

const axiosPublic = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosPrivate = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Ensure cookies are sent with requests
});

export { axiosPublic, axiosPrivate };
