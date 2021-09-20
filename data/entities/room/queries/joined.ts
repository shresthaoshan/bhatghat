import { useQuery } from "react-query";
import { onJoinedRoomsGet } from "../room.service";

export const useJoinedRooms = () => {
	return useQuery("joined-rooms", onJoinedRoomsGet);
};
