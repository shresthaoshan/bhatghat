import { useState } from "react";
import {
	isSupported,
	RemoteParticipant,
	connect,
	createLocalTracks,
	Room,
	LocalTrack,
	runPreflight,
	VideoTrack,
	AudioTrack,
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

export const useTwillio = (token: string) => {
	const [room, setRoom] = useState<Room>();
	const [peers, setPeers] = useState<Map<string, RemoteParticipant>>();
	const [localTrack, setLocalTrack] = useState<LocalTrack[]>();

	const [status, setStatus] = useState<StreamStatus>("idle");

	const initLocalTrack = async () => {
		setStatus("preparing");
		const _localTrack = await createLocalTracks({
			video: {
				facingMode: "environment",
			},
			audio: true,
		});
		setLocalTrack(_localTrack);
		setStatus("prepared");
	};

	const init = async () => {
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

	const joinRoom = async (roomName: string) => {
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

	const closeLocalTracks = () => {
		localTrack?.forEach((track) => {
			if (track.kind === "audio" || track.kind === "video") {
				track.stop();
			}
		});
	};

	return {
		isSupported,
		room,
		localTrack,
		peers,
		status,
		init,
		initLocalTrack,
		closeLocalTracks,
		joinRoom,
	};
};
