import React from "react";
import logo from "public/logo.png";
import { SiMailDotRu } from "react-icons/si";

import Image from "next/image";
import GoogleLoginButton from "components/GoogleLoginButton";
import LoginButton from "components/Buttons/LoginButton";

import css from "./welcome.module.css";

function EntryForm() {
	return (
		<div className={css.welcome_board}>
			<div>
				<div className="flex justify-center items-center flex-col py-4">
					<Image
						src={logo}
						alt="bhetghat logo"
						width={80}
						height={80}
					/>
					<h3 className="pt-6 pb-0 lg:pb-3 font-sans text-3xl font-semibold">
						Welcome to{" "}
						<span className="text-purple-700 font-serif font-bold text-4xl">
							bhetghat
						</span>
					</h3>
					<small className="px-6 font-sans font-normal text-gray-700 text-base text-center">
						Always remember to keep your circle small and
						conversation big.
					</small>
				</div>
				<div className="sign-in w-full p-4 mt-0 lg:mt-5">
					<div className="p-4 border-2 rounded-md text-center">
						<h4 className="text-lg font-sans font-medium">
							{/* eslint-disable-next-line */}
							Let's get you started...
						</h4>
						<div className="grid grid-rows-2 gap-4 mt-4">
							<GoogleLoginButton />
							<LoginButton icon={<SiMailDotRu size={20} />}>
								Login with email
							</LoginButton>
						</div>
					</div>
				</div>
				<div className="text-center text-base font-sans pb-4">
					<p>
						New here?{" "}
						<span className="text-purple-700 underline cursor-pointer">
							Register
						</span>
					</p>
				</div>
			</div>
			<div className="w-full flex justify-around text-sm border-t-2 pt-4 pb-4">
				<span className="text-purple-700 cursor-pointer">
					Terms of Service
				</span>

				<span className="text-purple-700 cursor-pointer">
					Privacy Policies
				</span>
			</div>
		</div>
	);
}

export default EntryForm;
