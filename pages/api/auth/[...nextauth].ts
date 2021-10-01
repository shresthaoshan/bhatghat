import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import tokenUtils from "utils/token.utils";
import authUtils from "utils/auth.utils";

import authConfigs from "configs/auth_configs";
import google_conf from "configs/google_configs";

export default NextAuth({
	providers: [
		Providers.Google({
			clientId: google_conf.CLIENT_ID,
			clientSecret: google_conf.CLIENT_SECRET,
		}),
		Providers.Credentials({
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "john@doe.com",
				},
				password: {
					label: "Password",
					type: "Password",
					placeholder: "***************",
				},
			},
			authorize: authUtils.authorize,
		}),
	],
	debug: process.env.NODE_ENV !== "production",
	session: {
		jwt: true,
	},
	jwt: {
		secret: authConfigs.TOKEN_SECRET,
		encode: tokenUtils.encode,
		decode: tokenUtils.decode,
	},
});
