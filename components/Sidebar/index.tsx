import React from "react";
import Scrollbars from "react-custom-scrollbars";
import Controls from "./widgets/Controls";
import ParticipantItem, {
	ParticipantItemProps,
} from "./widgets/ParticipantItem";

const _dummy_avatar =
	"https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper.png";

const _participants: ParticipantItemProps[] = [
	{
		id: "1",
		name: "Oshan Shrestha",
		avatar: _dummy_avatar,
	},
	{
		id: "2",
		name: "Dia Manandhar",
		avatar: "https://cdn.iconscout.com/icon/free/png-512/avatar-373-456325.png",
	},
	{
		id: "3",
		name: "Jenny TMG",
		avatar: "https://image.flaticon.com/icons/png/512/194/194938.png",
	},
	{
		id: "4",
		name: "Nilesh Shrestha",
		avatar: "https://freepngimg.com/download/facebook/62681-flat-icons-face-computer-design-avatar-icon.png",
	},
];

function Sidebar() {
	return (
		<div className="container p-2 flex flex-col gap-1 max-w-xs h-full relative overflow-y-hidden shadow-lg bg-gray-500 rounded-md">
			<div
				style={{ flex: "40px" }}
				className="text-gray-300 z-10 bg-gray-500 font-medium m-0 p-2 font-sans"
			>
				<h3>Paritipants</h3>
			</div>
			<Scrollbars
				autoHide
				autoHideDuration={200}
				autoHideTimeout={1000}
				className="flex-auto rounded-lg overflow-hidden"
				universal
			>
				<div className="list">
					{[
						..._participants,
						..._participants,
						..._participants,
						..._participants,
						..._participants,
					].map((item, i) => (
						<ParticipantItem
							key={i + "" + item.id}
							name={item.name}
							id={item.id}
							avatar={item.avatar}
						/>
					))}
				</div>
			</Scrollbars>
			<Controls />
		</div>
	);
}

export default Sidebar;
