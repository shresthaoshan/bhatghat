const prod = process.env.NODE_ENV === "production";

const api_configs = {
	BASE_URL: prod
		? process.env.API_BASE_URL || "http://api.bhetghat.oshan.codes"
		: "http://localhost:3011",
};
export default api_configs;
