import api_configs from "configs/api_configs";
import { useEffect, useState } from "react";
import { Manager, Socket } from "socket.io-client";
import { subscribeManager } from "subscribers/wsmanager.subscriber";
import {
	subscribeSocket,
	unsubscribeSocket,
} from "subscribers/socket.subscriber";

export const useWebsocket = () => {
	const manager = new Manager(api_configs.BASE_URL + "/socket.io", {
		reconnectionAttempts: 3,
	});
	subscribeManager(manager);

	const [socket, setSocket] = useState<Socket | null>(null);
	useEffect(() => {
		if (manager) {
			if (socket) subscribeSocket(socket);
			else {
				const authToken = localStorage.getItem("token");
				setSocket(
					manager.socket("/", {
						auth: {
							token: `Bearer ${authToken}`,
						},
					})
				);
			}
		}
		return () => {
			if (socket) unsubscribeSocket(socket);
		};
		// eslint-disable-next-line
	}, [socket]);

	const join = () => {
		if (!socket) return;
		console.log("JOINING");

		socket.connect();
	};

	return { join };
};
