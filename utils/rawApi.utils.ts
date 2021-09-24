import axios, { AxiosError } from "axios";
import api_configs from "configs/api_configs";

const rawClient = axios.create({
	baseURL: api_configs.BASE_URL,
});

rawClient.interceptors.response.use((response) => {
	return response?.data;
});

export default rawClient;
