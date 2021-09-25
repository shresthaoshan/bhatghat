import React, { FC, ReactNode } from "react";
import Link from "next/link";

interface MenuItemProps {
	link?: string;
	icon?: ReactNode | FC;
	onClick?: () => void;
}

const CMenuItem: FC<MenuItemProps> = ({
	icon,
	link,
	children,
	onClick,
	...otherProps
}) => {
	if (link)
		return (
			<Link href={link}>
				<a>
					<div
						{...otherProps}
						className="cursor-pointer py-2 pl-3 pr-24 flex flex-row items-center gap-5 bg-white hover:bg-purple-600 hover:text-white transition-colors"
					>
						{icon && <div className="text-base">{icon}</div>}
						{children}
					</div>
				</a>
			</Link>
		);
	return (
		<div
			{...otherProps}
			className="cursor-pointer py-2 pl-3 pr-24 flex flex-row items-center gap-5 bg-white hover:bg-purple-600 hover:text-white transition-colors"
		>
			{icon && <div className="text-base">{icon}</div>}
			{children}
		</div>
	);
};

export default CMenuItem;
