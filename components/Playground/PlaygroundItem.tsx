import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { FC } from "react";
import { RemoteParticipant } from "twilio-video";

interface PlaygroundItemProps {
	peer: RemoteParticipant;
}

const PlaygroundItem: FC<PlaygroundItemProps> = ({ peer, ...otherProps }) => {
	const player = useRef();

	return (
		<section
			{...otherProps}
			ref={player}
			className="bg-gray-900 rounded-md overflow-hidden shadow-md"
		></section>
	);
};

export default PlaygroundItem;
