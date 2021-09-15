import { useMutation } from "react-query";
import { onLoginWithGoogle } from "../login.services";

export const useLoginWithGoogle = () => {
	const { data, error, mutate, status } = useMutation(
		"loginwithgoogle",
		onLoginWithGoogle,
		{}
	);
	return {
		data,
		error,
		status,
		login: mutate,
	};
};
