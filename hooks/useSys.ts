import { useSession } from "next-auth/client";

export const useSys = () => {
	const [session, isLogged] = useSession();
	return {
		session,
		isLogged,
	};
};
