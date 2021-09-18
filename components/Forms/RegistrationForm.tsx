import { Form, Input, Button } from "antd";
import { WelcomeFormShow } from "components/Welcome/types";
import { useAuth } from "data/store/auth.store";
import { motion } from "framer-motion";
import React, { FC } from "react";

interface FormProps {
	changeShow?: (show: WelcomeFormShow) => void;
}

const RegistrationForm: FC<FormProps> = ({ changeShow }) => {
	const { status } = useAuth();

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
			key="register"
			className="p-4 border-2 border-gray-700 rounded-md"
		>
			<h4 className="text-base font-sans font-medium text-center">
				{/* eslint-disable-next-line */}
				<span className="flex w-full justify-center items-center gap-2">
					Register for an account
				</span>
			</h4>
			<Form
				className="w-full px-4 mt-4 flex flex-col"
				onFinish={(values) => {}}
			>
				<Form.Item
					className="m-0"
					rules={[
						{
							required: true,
							message: "Please enter your display name.",
						},
					]}
					name="name"
				>
					<Input
						autoComplete="off"
						className="w-full py-1 mt-4 mb-1 border-0 border-b-2 border-gray-600 focus:border-purple-700 transition-colors font-sans text-base focus:outline-none"
						placeholder="Display name"
					/>
				</Form.Item>
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
					loading={status === "REGISTERING"}
					disabled={status === "REGISTERING"}
					type="primary"
					className="my-4 font-sans border-0 bg-green-600 hover:bg-purple-700 transition-colors text-base focus:outline-none"
					htmlType="submit"
				>
					Register
				</Button>
				<div className="extra mt-3 w-full flex flex-col gap-2 items-start">
					<p className="text-sm font-sans">
						Already a user?{" "}
						<span
							onClick={() => {
								changeShow("options");
							}}
							className="text-purple-700 underline cursor-pointer"
						>
							Login
						</span>
					</p>
				</div>
			</Form>
		</motion.div>
	);
};

export default RegistrationForm;
