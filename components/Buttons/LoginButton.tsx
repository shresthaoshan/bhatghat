import React, { FC, ReactNode } from "react";

interface LoginButtonProps {
	icon?: ReactNode;
	onClick?: () => void;
	disabled?: boolean;
}

const LoginButton: FC<LoginButtonProps> = ({
	icon,
	onClick,
	disabled,
	children,
	...otherProps
}) => {
	return (
		<button
			onClick={() => {
				!disabled && onClick && onClick();
			}}
			disabled={disabled}
			className={`text-gray-900 border-2 bg-white border-gray-900 transition-colors hover:border-purple-700 hover:text-purple-700 text-base font-sans font-medium py-3 rounded-md shadow-md flex flex-row gap-4 justify-center items-center`}
			{...otherProps}
		>
			{icon && <span>{icon}</span>}
			{children}
		</button>
	);
};

export default LoginButton;
