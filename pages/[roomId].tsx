import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";
import Playground from "../components/Playground";
import Sidebar from "../components/Sidebar";

export const getServerSideProps: GetServerSideProps<{ session: Session }> =
	async (context: GetServerSidePropsContext) => {
		const session = await getSession(context);

		const {
			url,
			headers: { host },
		} = context.req;

		if (session)
			return {
				props: { session },
			};
		return {
			redirect: {
				destination:
					"/api/auth/signin?callbackUrl=" +
					encodeURI("http://" + host + url),
				permanent: false,
			},
		};
	};

function Room() {
	return (
		<>
			<div className="flex flex-row gap-4 h-full justify-between">
				<Playground />
				<Sidebar />
			</div>
		</>
	);
}

export default Room;
