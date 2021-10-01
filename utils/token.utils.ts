import jwt from "jsonwebtoken";
import type { JWT } from "next-auth/jwt";

const tokenUtils = {
	encode: async ({ token, secret }) => {
		console.log({ secret });

		return new Promise<string>((resolve, reject) => {
			jwt.sign(
				token,
				secret,
				{
					algorithm: "HS512",
				},
				(err, encoded) => {
					if (err) reject(err);
					resolve(encoded);
				}
			);
		});
	},
	decode: async ({ token, secret }) =>
		new Promise<JWT>((resolve, reject) => {
			jwt.verify(
				token,
				secret,
				{
					algorithms: ["HS512"],
				},
				(err, decoded) => {
					if (err) reject(err);
					resolve(decoded);
				}
			);
		}),
};

export default tokenUtils;
