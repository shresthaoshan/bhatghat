import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { FC } from "react";

import RoomList from "components/RoomList";
import Welcome from "components/Welcome";

import Image from "next/image";
import bg from "public/vectors/friends-elem.png";
import { getSession } from "next-auth/client";
import { Session } from "next-auth";

interface HomeProps {
	sess: Session;
}

export const getServerSideProps: GetServerSideProps<{ sess: Session }> = async (
	context: GetServerSidePropsContext
) => {
	const session = await getSession(context);

	console.log({ session });

	if (session)
		return {
			props: { sess: session },
		};
	return {
		redirect: {
			destination: "/api/auth/signin",
			permanent: false,
		},
	};
};

const Home: FC<HomeProps> = ({ sess }) => {
	return (
		<>
			<div className="flex flex-col lg:flex-row gap-4 lg:gap-0 min-h-full lg:h-full justify-between">
				<div className="flex-auto flex">
					<div className="w-full flex flex-col justify-end lg:justify-center items-center relative">
						<Image
							src={bg}
							alt="friends in bhetghat concept"
							draggable={false}
							layout="intrinsic"
						/>
						<div className="flex flex-row gap-6 absolute bottom-0 left-4 invisible lg:visible">
							<span className="text-gray-300 font-medium cursor-pointer">
								Terms of Service
							</span>
							<span className="text-gray-300 font-medium cursor-pointer">
								Privacy Policies
							</span>
						</div>
					</div>
				</div>
				{!sess ? <Welcome /> : <RoomList />}
			</div>
		</>
	);
};

export default Home;
