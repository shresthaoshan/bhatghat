import { Manager } from "socket.io-client";

const wsman_subs = {
	open: () => {
		console.log("OPENED");
	},
	close: (reason) => {
		console.log("CLOSED:: ", reason);
	},
	error: (err) => {
		console.log({ err });
	},
	ping: () => {
		console.log("PINGED");
	},
	packet: (packet) => {
		console.log("PACKET RECEIVED:: ", packet);
	},
	reconnect: (attempt) => {
		console.log("RECONNECTED:: ", attempt);
	},
	reconnect_attempt: (attempt) => {
		console.log("RECONNECTING:: ", attempt);
	},
	reconnect_failed: () => {
		console.log("FAILED TO RECONNECT");
	},
};

export const subscribeManager = (manager: Manager) => {
	manager.on("ping", wsman_subs.ping);
	manager.on("open", wsman_subs.open);
	manager.on("close", wsman_subs.close);
	manager.on("error", wsman_subs.error);
	manager.on("packet", wsman_subs.packet);
	manager.on("reconnect", wsman_subs.reconnect);
	manager.on("reconnect_failed", wsman_subs.reconnect_failed);
	manager.on("reconnect_attempt", wsman_subs.reconnect_attempt);
};

export const unsubscribeManager = (manager: Manager) => {
	manager.off("ping", wsman_subs.ping);
	manager.off("open", wsman_subs.open);
	manager.off("close", wsman_subs.close);
	manager.off("error", wsman_subs.error);
	manager.off("packet", wsman_subs.packet);
	manager.off("reconnect", wsman_subs.reconnect);
	manager.off("reconnect_failed", wsman_subs.reconnect_failed);
	manager.off("reconnect_attempt", wsman_subs.reconnect_attempt);
};
