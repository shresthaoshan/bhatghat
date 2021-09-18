import React, { useState } from "react";
import logo from "public/logo.png";
import Image from "next/image";
import LoginButton from "components/Buttons/LoginButton";
import GoogleLoginButton from "components/GoogleLoginButton";

import { Button, Form, Input } from "antd";
import { SiMailDotRu } from "react-icons/si";
import { useAuth } from "data/store/auth.store";
import { AnimatePresence, motion } from "framer-motion";

function EntryForm() {
	const { loginWithEmail, status } = useAuth();
	const [toShow, setToShow] = useState<"options" | "login">("options");

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
										scaleY: 0,
									}}
									animate={{
										scaleY: 1,
										transition: {
											duration: 0.3,
											type: "spring",
											damping: 25,
											stiffness: 500,
										},
									}}
									exit={{
										scaleY: 0,
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
										<span className="text-purple-700 underline cursor-pointer">
											Register
										</span>
									</p>
								</div>
							</motion.div>
						)}
						{toShow === "login" && (
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
								key="login"
								className="p-4 border-2 border-gray-700 rounded-md"
							>
								<h4 className="text-base font-sans font-medium text-center">
									{/* eslint-disable-next-line */}
									Login with your email
								</h4>
								<Form
									className="w-full px-4 mt-4 flex flex-col"
									onFinish={(values) =>
										loginWithEmail(
											values.email,
											values.password
										)
									}
								>
									<Form.Item
										className="m-0"
										rules={[
											{
												required: true,
												message: "Email is required.",
											},
										]}
										name="email"
									>
										<Input
											className="w-full py-1 mt-4 mb-1 border-0 border-b-2 border-gray-600 focus:border-purple-700 transition-colors font-sans text-base focus:outline-none"
											placeholder="Email"
										/>
									</Form.Item>
									<Form.Item
										className="m-0"
										rules={[
											{
												required: true,
												message:
													"Password is required.",
											},
										]}
										name="password"
									>
										<Input.Password
											className="w-full py-1 mt-4 mb-1 border-0 border-b-2 border-gray-600 focus:border-purple-700 transition-colors font-sans text-base focus:outline-none"
											placeholder="Password"
										/>
									</Form.Item>
									<Button
										loading={status === "LOGGING_IN"}
										disabled={status === "LOGGING_IN"}
										type="primary"
										className="my-4 font-sans border-0 bg-gray-700 hover:bg-purple-700 transition-colors text-base focus:outline-none"
										htmlType="submit"
									>
										Log in
									</Button>
									<div className="extra w-full flex flex-col gap-2 items-end">
										<p className="text-sm text-purple-700 font-sans underline">
											Forgot Password?
										</p>
										<p className="text-sm text-purple-700 font-sans underline cursor-pointer">
											<span
												onClick={() => {
													setToShow("options");
												}}
											>
												Other login options
											</span>
										</p>
									</div>
								</Form>
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</div>
			{/* <div className="w-full flex justify-around text-sm border-t-2 pt-4 pb-4">

			</div> */}
		</div>
	);
}

export default EntryForm;
