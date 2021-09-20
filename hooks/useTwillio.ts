import { useState } from "react";
import {
	isSupported,
	RemoteParticipant,
	connect,
	createLocalTracks,
	Room,
	runPreflight,
	LocalAudioTrack,
	LocalVideoTrack,
} from "twilio-video";
import twillio_config from "configs/twillio.config";

const { connection_opts } = twillio_config;

export type StreamStatus =
	| "idle"
	| "preparing"
	| "prepared"
	| "initiating"
	| "initiated"
	| "joining"
	| "joined"
	| "leaving"
	| "left"
	| "disconnected"
	| "failed";

export const useTwillio = () => {
	const [room, setRoom] = useState<Room>();
	const [peers, setPeers] = useState<Map<string, RemoteParticipant>>();
	const [localTrack, setLocalTrack] =
		useState<[LocalAudioTrack, LocalVideoTrack]>();

	const [status, setStatus] = useState<StreamStatus>("idle");

	const initLocalTrack = async () => {
		setStatus("preparing");
		const _localTrack = await createLocalTracks({
			video: {
				facingMode: "user",
			},
			audio: true,
		});
		let tracks = [];
		_localTrack.forEach((tr) => {
			if (tr.kind === "audio") tracks[0] = tr;
			if (tr.kind === "video") tracks[1] = tr;
		});
		setLocalTrack(tracks as [LocalAudioTrack, LocalVideoTrack]);
		setStatus("prepared");
	};

	const init = async (token: string) => {
		if (!isSupported) {
			setStatus("failed");
			throw new Error("Not supported. Aborted.");
		}
		setStatus("initiating");
		const preflight = runPreflight(token);

		preflight.on("failed", (err) => {
			console.log({ err });
			setStatus("failed");
			preflight.stop();
		});
		preflight.on("progress", (report) => {
			console.log({ report });
		});
		preflight.on("completed", (report) => {
			console.log({ report });
			setStatus("initiated");
			preflight.stop();
		});
	};

	const joinRoom = async (roomName: string, token: string) => {
		if (status !== "initiated")
			throw new Error("Not ready. Initiate the sequence first.");

		setStatus("joining");
		const _room = await connect(token, {
			...connection_opts,
			name: roomName,
			tracks: localTrack,
		});

		setStatus("joined");
		setRoom(_room);
		setPeers(_room.participants);
	};

	return {
		isSupported,
		room,
		localTrack,
		peers,
		status,
		init,
		initLocalTrack,
		joinRoom,
	};
};
