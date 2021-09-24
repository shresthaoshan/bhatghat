import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import google_conf from "configs/google_configs";

import { onLoginEmail } from "data/entities/login/login.services";

import jwtDecode from "jwt-decode";

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
					placeholder: "oshan.shrestha@gmail.com",
				},
				password: {
					label: "Password",
					type: "Password",
					placeholder: "***************",
				},
			},
			authorize: async (creds) => {
				try {
					const { email, password } = creds;
					const resp = await onLoginEmail(email, password);
					const payload = jwtDecode(resp.token);
					const { name, sid } = payload as any;
					return {
						name,
						email: resp.token,
						sub: sid,
						image: `https://avatars.dicebear.com/api/bottts/${sid}.svg`,
					};
				} catch (ex) {
					return false;
				}
			},
		}),
	],
	debug: process.env.NODE_ENV !== "production",
	session: {
		jwt: true,
	},
	jwt: {},
});