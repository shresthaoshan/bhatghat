import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { Provider } from "next-auth/client";
import { RecoilRoot } from "recoil";

import "antd/dist/antd.min.css";
import "tailwindcss/tailwind.css";
import "../styles/globals.css";

import Head from "next/head";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps }) {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<>
			<Head>
				<title>BhetGhat</title>
				<meta
					name="description"
					content="A quiet and safe place for a group of close friends to hangout, that is 'BhetGhat'."
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Provider session={pageProps.session}>
				<RecoilRoot>
					<QueryClientProvider client={queryClient}>
						<Hydrate state={pageProps.dehydratedState}>
							<AnimatePresence initial exitBeforeEnter>
								<main className="container mx-auto py-0 lg:py-5 h-screen">
									<Component {...pageProps} />
								</main>
							</AnimatePresence>
						</Hydrate>
					</QueryClientProvider>
				</RecoilRoot>
			</Provider>
		</>
	);
}
export default MyApp;
