import { AxiosRequestConfig, Method } from "axios";
import type { NextApiHandler } from "next";

import jwtDecode from "jwt-decode";
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
			const payload = jwtDecode(token);
			config.headers = {
				Authorization: `Bearer ${(payload as any).email}`,
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
