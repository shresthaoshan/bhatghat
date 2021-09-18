import React, { useState } from "react";
import logo from "public/logo.png";
import Image from "next/image";
import LoginButton from "components/Buttons/LoginButton";
import GoogleLoginButton from "components/GoogleLoginButton";

import { Button, Form, Input } from "antd";
import { SiMailDotRu } from "react-icons/si";
import { useAuth } from "data/store/auth.store";
import { AnimatePresence, motion } from "framer-motion";
import RegistrationForm from "components/Forms/RegistrationForm";
import LoginForm from "components/Forms/LoginForm";
import { WelcomeFormShow } from "./types";

function EntryForm() {
	const [toShow, setToShow] = useState<WelcomeFormShow>("options");

	return (
		<div
			className={`shadow-lg h-full lg:rounded-lg overflow-hidden bg-white pt-3 md:pt-8 ${
				toShow === "options" ? "lg:pt-16" : "lg:pt-6"
			} pb-0 flex flex-col gap-2 justify-between transition-all`}
		>
			<div>
				<div className="flex justify-center items-center flex-col py-2">
					<Image
						src={logo}
						alt="bhetghat logo"
						width={80}
						height={80}
					/>
					<h3 className="pt-6 pb-0 lg:pb-3 font-sans text-3xl font-semibold">
						<AnimatePresence initial exitBeforeEnter>
							{toShow === "options" && (
								<motion.span
									initial={{
										opacity: 0,
									}}
									animate={{
										opacity: 1,
										transition: {
											duration: 0.3,
											type: "spring",
											damping: 25,
											stiffness: 500,
										},
									}}
									exit={{
										opacity: 0,
									}}
								>
									Welcome to
								</motion.span>
							)}
						</AnimatePresence>{" "}
						<span className="text-purple-700 font-serif font-bold text-4xl">
							bhetghat
						</span>
					</h3>
					<small className="px-6 font-sans font-normal text-gray-700 text-base text-center">
						Always remember to keep your circle small and
						conversation big.
					</small>
				</div>
				<div
					style={{ width: "min(520px, 100%)" }}
					className="sign-in p-4 pt-2 mt-0 lg:mt-5 mx-auto"
				>
					<AnimatePresence initial exitBeforeEnter>
						{toShow === "options" && (
							<motion.div
								initial={{
									x: "100%",
									opacity: 0,
								}}
								animate={{
									x: "0%",
									opacity: 1,
									transition: {
										duration: 0.2,
										type: "spring",
										damping: 25,
										stiffness: 500,
									},
								}}
								exit={{
									x: "0%",
									opacity: 0,
								}}
								key="options"
								className="p-4 border-2 rounded-md text-center"
							>
								<h4 className="text-lg font-sans font-medium">
									{/* eslint-disable-next-line */}
									Let's get you started...
								</h4>
								<div className="grid grid-rows-2 gap-4 mt-4">
									<GoogleLoginButton />
									<LoginButton
										onClick={() => setToShow("login")}
										icon={<SiMailDotRu size={20} />}
									>
										Login with email
									</LoginButton>
								</div>
								<div className="text-center text-base font-sans pb-2 mt-6">
									<p>
										New here?{" "}
										<span
											onClick={() =>
												setToShow("register")
											}
											className="text-purple-700 underline cursor-pointer"
										>
											Register
										</span>
									</p>
								</div>
							</motion.div>
						)}
						{toShow === "login" && (
							<LoginForm changeShow={(str) => setToShow(str)} />
						)}
						{toShow === "register" && (
							<RegistrationForm
								changeShow={(str) => setToShow(str)}
							/>
						)}
					</AnimatePresence>
				</div>
			</div>
		</div>
	);
}

export default EntryForm;
