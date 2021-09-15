import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";

import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { useState } from "react";

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
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<main className="container mx-auto py-0 lg:py-5 h-screen">
						<Component {...pageProps} />
					</main>
				</Hydrate>
			</QueryClientProvider>
		</>
	);
}
export default MyApp;
