import React from "react";

import { FiMicOff, FiVideo, FiVideoOff } from "react-icons/fi";
import { ImPhoneHangUp } from "react-icons/im";

function Controls() {
	return (
		<div
			className="bg-transparent flex flex-row gap-2 pt-1 rounded-md overflow-hidden"
			style={{ flex: "60px" }}
		>
			<button className="bg-gray-400 text-gray-800 hover:bg-gray-300 transition-colors py-3 w-1/3 flex items-center justify-center rounded-md">
				<FiMicOff size={20} />
			</button>
			<button className="bg-gray-400 text-gray-800 hover:bg-gray-300 transition-colors py-3 w-1/3 flex items-center justify-center rounded-md">
				<FiVideoOff size={20} />
			</button>
			<button className="bg-red-600 hover:bg-red-500 transition-colors text-gray-200 py-3 w-1/3 flex items-center justify-center rounded-md">
				<ImPhoneHangUp size={20} />
			</button>
		</div>
	);
}

export default Controls;
