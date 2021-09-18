import React from "react";
import GoogleLogin from "react-google-login";
import google_conf from "configs/google_configs";
import LoginButton from "components/Buttons/LoginButton";

import { FcGoogle } from "react-icons/fc";
import { useAuth } from "data/store/auth.store";

function GoogleLoginButton() {
	const { loginWithGoogle, status } = useAuth();

	return (
		<>
			<GoogleLogin
				clientId={google_conf.CLIENT_ID}
				cookiePolicy="single_host_origin"
				responseType="token"
				uxMode="popup"
				theme="dark"
				icon={false}
				onSuccess={(pack) => {
					loginWithGoogle(pack);
				}}
				disabled={status === "LOGGING_IN"}
				render={(props) => (
					<LoginButton
						icon={<FcGoogle size={20} />}
						onClick={props.onClick}
						disabled={props.disabled}
					>
						Login with google
					</LoginButton>
				)}
			/>
		</>
	);
}

export default GoogleLoginButton;
