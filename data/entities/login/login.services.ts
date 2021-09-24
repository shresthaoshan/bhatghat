import client from "utils/api.utils";
import rawClient from "utils/rawApi.utils";
import { LoginResponse } from "./login.types";

export const onLoginWithGoogle = (token: string): Promise<LoginResponse> =>
	rawClient.post("/auth/loginWithGoogle", { token });

export const onLoginEmail = (
	email: string,
	password: string
): Promise<LoginResponse> => rawClient.post("/auth/login", { email, password });

export const onRegistration = (
	name: string,
	email: string,
	password: string
): Promise<LoginResponse> =>
	rawClient.post("/auth/register", { name, email, password });

export const onVerification = (code: string): Promise<LoginResponse> =>
	client.post("/auth/verify", { code });

export const onTokenValidation = async () => client.get("/auth/verifyToken");
