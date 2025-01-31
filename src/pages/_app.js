import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
	const router = useRouter();
	const isHomePage = router.pathname === "/";

	return (
		<>
			<Head>
				<link rel="icon" href="/images/favicon.png" />
			</Head>
			<main className={inter.className}>
				{!isHomePage && <Navbar />}
				<Component {...pageProps} />
			</main>
			<footer>
				<Footer />
			</footer>
			<Toaster
				position="bottom-left"
				toastOptions={{
					duration: 5000,
				}}
			/>
		</>
	);
}
