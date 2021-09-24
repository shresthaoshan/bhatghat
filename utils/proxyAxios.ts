import axios from "axios";
import api_configs from "configs/api_configs";

const proxyClient = axios.create({
	baseURL: api_configs.BASE_URL,
});

proxyClient.interceptors.response.use((response) => {
	return response?.data;
});

export default proxyClient;
