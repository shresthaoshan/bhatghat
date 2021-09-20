import axios from "axios";
import type { AxiosError } from "axios";
import api_configs from "configs/api_configs";

const client = axios.create({
	baseURL: api_configs.BASE_URL,
});

client.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token && token.length) config.headers.authorization = `Bearer ${token}`;
	return config;
});

client.interceptors.response.use(
	(response) => {
		console.log({ response });
		return response.data;
	},
	(error: AxiosError) => {
		throw error.response.data;
	}
);

export default client;
