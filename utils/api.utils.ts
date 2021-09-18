import axios from "axios";
import type { AxiosError } from "axios";
import api_configs from "configs/api_configs";

const client = axios.create({
	baseURL: api_configs.BASE_URL,
});

client.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token.length) config.headers.authorization = `Bearer ${token}`;
	return config;
});

client.interceptors.response.use(
	(response) => response.data,
	(error: AxiosError) => Promise.reject(error.response.data as string)
);

export default client;
