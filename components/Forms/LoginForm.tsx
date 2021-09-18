import { Form, Input, Button } from "antd";
import { WelcomeFormShow } from "components/Welcome/types";
import { useAuth } from "data/store/auth.store";
import { motion } from "framer-motion";
import React, { FC } from "react";
import { SiMailDotRu } from "react-icons/si";

interface FormProps {
	changeShow?: (show: WelcomeFormShow) => void;
}

const LoginForm: FC<FormProps> = ({ changeShow }) => {
	const { loginWithEmail, status } = useAuth();

	return (
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
				<span className="flex w-full justify-center items-center gap-2">
					<SiMailDotRu size={20} />
					Login with your email
				</span>
			</h4>
			<Form
				className="w-full px-4 mt-4 flex flex-col"
				onFinish={(values) =>
					loginWithEmail(values.email, values.password)
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
						autoComplete="off"
						type="email"
						className="w-full py-1 mt-4 mb-1 border-0 border-b-2 border-gray-600 focus:border-purple-700 transition-colors font-sans text-base focus:outline-none"
						placeholder="Email"
					/>
				</Form.Item>
				<Form.Item
					className="m-0"
					rules={[
						{
							required: true,
							message: "Password is required.",
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
								changeShow("options");
							}}
						>
							Other login options
						</span>
					</p>
				</div>
			</Form>
		</motion.div>
	);
};

export default LoginForm;
