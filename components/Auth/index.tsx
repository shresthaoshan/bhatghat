import { useAuth } from "data/store/auth.store";
import React, { FC, useEffect } from "react";

const AuthComponent: FC<{}> = ({ children }) => {
	const { validateToken } = useAuth();

	useEffect(() => {
		validateToken();
		// eslint-disable-next-line
	}, []);

	return <div>{children}</div>;
};

export default AuthComponent;
