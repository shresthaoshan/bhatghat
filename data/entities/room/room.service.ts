import client from "utils/api.utils";
import { IRoom } from "./room.types";

export const onJoinedRoomsGet = (): Promise<IRoom[]> =>
	client.get("/participant/of");
