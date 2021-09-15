import axios from "axios";
import api_configs from "configs/api_configs";

const client = axios.create({
	baseURL: api_configs.BASE_URL,
});

client.interceptors.response.use((response) => response.data);

export default client;
