import axios from "axios";
import type { AxiosError } from "axios";

const client = axios.create({
	baseURL: "/api/proxy/remote",
});

client.interceptors.response.use(
	(response) => {
		return response?.data;
	},
	(error: AxiosError) => {
		throw (
			error.response?.data ||
			new Error("Nothing returned from the server.")
		);
	}
);

export default client;
