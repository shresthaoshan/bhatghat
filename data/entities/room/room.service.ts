import client from "utils/api.utils";

export const onJoinedRoomsGet = (): Promise<IRoom[]> =>
	client.get("/participant/of");
