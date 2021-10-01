import { AxiosRequestConfig, Method } from "axios";
import type { NextApiHandler } from "next";

import proxyClient from "utils/proxyAxios";

const remote: NextApiHandler = async (req, res) => {
	try {
		// how
		const url = req.url.split("/api/proxy/remote")[1];
		let config: AxiosRequestConfig = {
			method: req.method.toUpperCase() as Method,
			url: url,
		};

		// who
		const token = req.cookies["next-auth.session-token"];
		if (token && token.length) {
			config.headers = {
				Authorization: `Bearer ${token}`,
			};
		}

		// what
		if (["post", "put", "patch"].includes(req.method.toLowerCase()))
			config.data = req.body;

		// go fetch
		const resp = await proxyClient(config);

		// send ittt
		res.json(resp);
	} catch (ex) {
		// oopsie
		res.status(ex.response?.status || 500).json({
			message: ex.response?.statusText || ex.message,
			name: ex.name,
			code: ex.code,
		});
	}
};

export default remote;
