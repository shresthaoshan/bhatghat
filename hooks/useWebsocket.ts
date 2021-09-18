import api_configs from "configs/api_configs";
import { useEffect, useState } from "react";
import { Manager, Socket } from "socket.io-client";
import { subscribeManager } from "subscribers/wsmanager.subscriber";
import {
	subscribeSocket,
	unsubscribeSocket,
} from "subscribers/socket.subscriber";

export const useWebsocket = (authToken: string) => {
	const manager = new Manager(api_configs.BASE_URL + "/socket.io", {
		reconnectionAttempts: 3,
	});
	subscribeManager(manager);

	const [socket, setSocket] = useState<Socket | null>(null);
	useEffect(() => {
		if (manager && authToken) {
			if (socket) subscribeSocket(socket);
			else
				setSocket(
					manager.socket("/", {
						auth: {
							token: `Bearer ${authToken}`,
						},
					})
				);
		}
		return () => {
			if (socket) unsubscribeSocket(socket);
		};
		// eslint-disable-next-line
	}, [socket, authToken]);

	const join = () => {
		if (!authToken.length) return;
		if (!socket) return;
		console.log("JOINING");

		socket.connect();
	};

	return { join };
};
