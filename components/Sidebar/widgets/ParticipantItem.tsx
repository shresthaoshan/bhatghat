import React, { FC } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

interface AvatarProps {
	link: string;
	name?: string;
}

const Avatar: FC<AvatarProps> = ({ link, name }) => (
	<div className="w-9 h-9 border-2 border-gray-500 rounded-full overflow-hidden">
		{/* eslint-disable-next-line */}
		<img
			className="w-full h-full object-cover"
			src={link}
			alt={`avatar of ${name ? name : "the participant"}`}
		/>
	</div>
);

export interface ParticipantItemProps {
	name: string;
	id: string;
	avatar: string;
}

const ParticipantItem: FC<ParticipantItemProps> = ({
	id,
	avatar,
	name,
	...otherProps
}) => {
	return (
		<div
			{...otherProps}
			className="p-2 w-full border-2 border-gray-500 flex flex-row justify-between items-center bg-gray-400 hover:bg-gray-200 transition-colors rounded-lg cursor-pointer"
		>
			<div className="flex flex-row justify-between items-center gap-3">
				<Avatar link={avatar} name={name} />
				<div className="text-sm font-medium flex-auto text-gray-800">
					<span>{name}</span>
				</div>
			</div>
			<div className="flex items-center mr-2">
				<button className="p-1 border-2 border-transparent hover:border-gray-600 transition-colors rounded-full">
					<BiDotsVerticalRounded />
				</button>
			</div>
		</div>
	);
};

export default ParticipantItem;
