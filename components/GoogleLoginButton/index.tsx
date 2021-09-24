import React from "react";
import LoginButton from "components/Buttons/LoginButton";

import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/client";

function GoogleLoginButton() {
	return (
		<>
			<LoginButton
				onClick={() => {
					signIn("google");
				}}
				icon={<FcGoogle size={20} />}
			>
				Login with google
			</LoginButton>
		</>
	);
}

export default GoogleLoginButton;
