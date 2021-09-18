import { Socket } from "socket.io-client";
import { socket_subscriptions } from "./subscriptions";

export const subscribeSocket = (socket: Socket) => {
	socket.on("connect", () => console.log("Connected"));
	Object.keys(socket_subscriptions).forEach((event) =>
		socket.on(event, socket_subscriptions[event])
	);
	console.log("SOCKET:: Subscribed.");
};
export const unsubscribeSocket = (socket: Socket) => {
	Object.keys(socket_subscriptions).forEach((event) =>
		socket.off(event, socket_subscriptions[event])
	);
	console.log("SOCKET:: Unsubscribed.");
};
