import { Spin } from "antd";
import { useJoinedRooms } from "data/entities/room/queries/joined";
import Link from "next/link";
import Image from "next/image";
import React from "react";

import { RiRefreshLine } from "react-icons/ri";

function RoomList() {
	const {
		data,
		status: joinedRoomStatus,
		refetch,
		isFetching,
		isLoading,
	} = useJoinedRooms();

	return (
		<div
			style={{ flex: "0 1 400px" }}
			className="shadow-lg h-full min-h-full lg:rounded-lg bg-white py-3 flex flex-col gap-2 transition-all"
		>
			<div className="w-full h-6 flex justify-between items-center px-3">
				<h3 className="text-lg font-sans font-medium">
					<span>Your Circles</span>
				</h3>
				<button
					className="rounded-full transition-colors hover:text-purple-400"
					onClick={() => {
						console.log("REFETCHING...");
						refetch();
					}}
				>
					<RiRefreshLine size={20} />
				</button>
			</div>
			<div className="h-full">
				<Spin
					spinning={
						joinedRoomStatus === "loading" ||
						isLoading ||
						isFetching
					}
				>
					<div className="w-full border-t-2">
						{joinedRoomStatus === "success" &&
							data.map((item) => (
								<Link
									passHref
									href={`/${item._id}`}
									key={item._id}
								>
									<div className="p-3 cursor-pointer w-full flex flex-row gap-5 items-center border-b-2 hover:bg-purple-600 hover:text-white transition-colors">
										<div
											style={{ height: 40, width: 40 }}
											className="rounded-full border-2 overflow-hidden flex justify-center items-center bg-white"
										>
											<Image
												width={40}
												height={40}
												alt={`avatar for room ${item.name}`}
												src={`https://avatars.dicebear.com/api/jdenticon/${item._id}.svg`}
												layout="fixed"
											/>
										</div>
										<div className="content">
											<h4 className="text-base font-medium font-sans m-0 text-current">
												{item.name}
											</h4>
											<small>{item.status}</small>
										</div>
									</div>
								</Link>
							))}
					</div>
				</Spin>
			</div>
		</div>
	);
}

export default RoomList;
