import React from "react";
import GoogleLogin from "react-google-login";
import google_conf from "configs/google_configs";
import { useLoginWithGoogle } from "data/entities/login/queries/WithGoogle";
import LoginButton from "components/Buttons/LoginButton";

import { FcGoogle } from "react-icons/fc";

function GoogleLoginButton() {
	const { data, error, login, status } = useLoginWithGoogle();

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
					login((pack as any).tokenId as string);
				}}
				disabled={status === "loading"}
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
