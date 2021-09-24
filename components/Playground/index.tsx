import React, { useEffect, useRef } from "react";
import router, { useRouter } from "next/router";

import { useTwillio } from "hooks/useTwillio";
import PlaygroundItem from "./PlaygroundItem";
import { LocalAudioTrack, LocalDataTrack, LocalVideoTrack } from "twilio-video";
import { useWebsocket } from "hooks/useWebsocket";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

interface QueryProps {
	roomId: string;
}

function Playground() {
	const { query } = useRouter();
	const { roomId }: QueryProps = query as any;
	const {
		init,
		subcribeSocket,
		initLocalTrack,
		room,
		peers,
		status,
		localTrack,
	} = useTwillio(roomId);

	const {} = useWebsocket();

	const localStreamPlayer = useRef<HTMLDivElement>();

	useEffect(() => {
		if (!localStreamPlayer) return;
		if (!localTrack) return;

		// filter tracks
		const videoTrack: LocalVideoTrack = localTrack.find(
			(track) => track.kind === "video"
		) as any;
		const audioTrack: LocalAudioTrack = localTrack.find(
			(track) => track.kind === "audio"
		) as any;
		// const dataTrack: LocalDataTrack = localTrack.find(
		// 	(track) => track.kind === "data"
		// ) as any;

		// plug tracks in
		localStreamPlayer.current.appendChild(videoTrack.attach());
		localStreamPlayer.current.appendChild(audioTrack.attach());
	}, [localStreamPlayer, localTrack]);

	useEffect(() => {
		const initSequence = async () => {
			await initLocalTrack();
			await init("");
		};

		initSequence();

		return () => {
			if (status === "joined") room.disconnect();
		};
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		return () => {
			if (!localTrack) return;

			let md: HTMLMediaElement[];
			localTrack.forEach((track) => {
				if (track.kind === "audio" || track.kind === "video") {
					md = track.detach();
					md.forEach((_m) => _m.remove());
					track.stop();
				}
			});
		};
	}, [localTrack]);

	return (
		<>
			<small className="absolute top-0 left-0">
				{status.toUpperCase()}: {peers?.size || 0}
			</small>
			<div
				id="call_canvas"
				className="container overflow-hidden gap-1 grid grid-cols-3 grid-rows-3 min-h-full rounded-md font-sans"
			>
				<div
					ref={localStreamPlayer}
					className="bg-gray-900 rounded-md overflow-hidden shadow-lg"
				></div>
				{/* {peers.((item) => (
					<PlaygroundItem peer={item} key={item.uid} />
				))} */}
			</div>
		</>
	);
}

export default Playground;
