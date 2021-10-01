import { onLoginEmail } from "data/entities/login/login.services";
import { User } from "next-auth";

const authUtils = {
	authorize: async (creds, _): Promise<any> => {
		try {
			const { email, password } = creds;
			const { name } = await onLoginEmail(email, password);
			return {
				name,
				email,
				image: `https://avatars.dicebear.com/api/initials/${name
					.split(" ")
					.join("")
					.toLowerCase()}.svg`,
			} as User;
		} catch (ex) {
			return null;
		}
	},
};

export default authUtils;
