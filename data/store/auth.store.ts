import jwtDecode from "jwt-decode";

import {
	onLoginEmail,
	onLoginWithGoogle,
} from "data/entities/login/login.services";
import { atom, useRecoilState } from "recoil";
import { message } from "antd";

interface IAuth {
	token: string;
	name: string;
	email: string;
	verified: string;
	status: "LOGGED_IN" | "LOGGING_IN" | "FAILED" | "LOGGED_OUT" | "IDLE";
}

// default values
const initValues: IAuth = {
	token: "",
	name: "",
	email: "",
	verified: "",
	status: "IDLE",
};

// atom declaration
const authAtom = atom<IAuth>({
	key: "sys",
	default: initValues,
});

// hook to handle (HTH)
export const useAuth = () => {
	const [authState, setAuth] = useRecoilState(authAtom);

	const tokenLogin = (token: string) => {
		const payload = jwtDecode(token) as Omit<
			Omit<IAuth, "status">,
			"token"
		>;
		setAuth({
			...payload,
			token,
			status: "LOGGED_IN",
		});
		message.success("You've been logged in successfully.");
	};

	const loginWithGoogle = async (pack) => {
		try {
			setAuth({
				...authState,
				status: "LOGGING_IN",
			});
			const resp = await onLoginWithGoogle((pack as any).tokenId);
			tokenLogin(resp.token);
		} catch (ex) {
			setAuth({
				...authState,
				status: "FAILED",
			});
			message.error(ex.message || "Something went wrong.");
		}
	};

	const loginWithEmail = async (email: string, password: string) => {
		try {
			setAuth({
				...authState,
				status: "LOGGING_IN",
			});
			const resp = await onLoginEmail(email, password);
			tokenLogin(resp.token);
		} catch (ex) {
			setAuth({
				...authState,
				status: "FAILED",
			});
			message.error(ex.message || "Something went wrong.");
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		setAuth({
			...initValues,
			status: "LOGGED_OUT",
		});
	};

	return { ...authState, loginWithGoogle, loginWithEmail, logout };
};
