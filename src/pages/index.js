import LandingpageCard from "@/components/LandingpageCard";
import { samplePOIs } from "@/utils/POIHelpers.js";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import LandingPageCardLink from "@/components/LandingPageLinks";
import { useEffect, useState } from "react";
import Link from "next/link";
import Head from "next/head";

export async function getServerSideProps() {
	try {
		// fetching hero data from Strapi
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/heroes?populate=*`
		);
		const heroData = await res.json();

		if (!res.ok) {
			throw new Error(`Failed to fetch Hero data: ${res.statusText}`);
		}
		// featured items fetching from Strapi
		const featuredRes = await fetch(
			`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/featured?populate[point_of_interests][populate][0]=images&populate[point_of_interests][populate][1]=location`
		);
		const featuredData = await featuredRes.json();
		console.log(featuredData);

		if (!featuredRes.ok) {
			throw new Error(
				`Failed to fetch Featured data: ${featuredRes.statusText}`
			);
		}

		// select a random hero on the server side
		const heroes = heroData?.data || [];
		const randomHero = heroes[Math.floor(Math.random() * heroes.length)];

		// Eetract the featured items
		const featuredItems = featuredData?.data?.point_of_interests || [];

		return {
			props: {
				hero: randomHero || null, // passing the selected hero as a prop
				featuredItems: featuredItems || [], // passing the featured items as a prop
			},
		};
	} catch (error) {
		console.error("Error fetching data:", error);
		return {
			props: {
				hero: null, // returning null if there's an error
				featuredItems: [], // returning an empty array if there's an error
			},
		};
	}
}

export default function Home({ hero, featuredItems }) {
	const [navIsTransparent, setNavIsTransparent] = useState(true);

	const heroImage = hero?.image?.url;
	const heroFact = hero?.fact || "No fact available";

	useEffect(() => {
		const handleScroll = () => {
			setNavIsTransparent(window.scrollY < 50 ? true : false);
		};

		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// Handle empty data
	if (!hero) {
		return <div>No hero data available.</div>;
	}

	return (
		<>
			<Head>
				<title>Discover Lincoln</title>
			</Head>
			<Navbar transparent={navIsTransparent} />
			<div>
				{/* Hero Section */}
				<div className="hero">
					<Hero image={heroImage} fact={heroFact} />
				</div>

				<div className="content-wrapper">
					{/* Featured Section */}
					<div className="featured-section flex items-center justify-between mb-6">
						<div className="text-2xl font-bold text-black-800">FEATURED</div>
						<Link
							href="/feed"
							className="text-xl font-bold text-black-500 ml-2 hover:text-black-500 hover:scale-105 transition-all duration-300"
						>
							SEE MORE &rarr;
						</Link>
					</div>

					{/* LandingPageCardGrid */}
					<div className="landingPageCardGrid">
						{featuredItems.map((poi, i) =>
							i % 2 === 0 ? (
								<div key={i} className="landingPageShortCard">
									<LandingpageCard pointOfInterest={poi} />
								</div>
							) : (
								<div key={i} className="landingPageLongCard">
									<LandingpageCard pointOfInterest={poi} />
								</div>
							)
						)}
					</div>

					{/* LandingPageCardLink Grid */}
					<div className="landingPageLinkGrid">
						<div>
							<LandingPageCardLink
								image="/images/discover-more.jpg"
								link="feed"
								text="DISCOVER MORE"
							/>
						</div>
						<div className="link-sub-grid">
							<LandingPageCardLink
								image="/images/learn-more.jpg"
								link="/about"
								text="LEARN MORE"
							/>
							<LandingPageCardLink
								image="/images/lincoln-trivia.jpg"
								link="/trivia"
								text="LINCOLN TRIVIA"
							/>
						</div>
					</div>

					{/* COMMUNITY MEMBER Section */}
					<div className="community-member-section">
						<div className="text-2xl font-bold text-black-800">
							COMMUNITY MEMBER?
						</div>
					</div>

					<div className="newLandingPageLink">
						<LandingPageCardLink
							image="/images/post-something.jpg"
							link="/create"
							text="POST SOMETHING"
						/>
					</div>
				</div>
			</div>

			<style jsx>{`
				.hero {
					position: relative;
					top: -76px;
				}
				.featured-section,
				.community-member-section {
					margin: 1rem 4rem;
					max-width: 1600px;
					width: 100%;
				}
				.landingPageCardGrid {
					display: grid;
					max-width: 1600px;
					grid-template-columns: repeat(3, 1fr);
					gap: 1rem 1rem;
					padding-bottom: 48px;
					margin-bottom: 48px;
					border-bottom: 1px solid gray;
				}
				.landingPageLongCard {
					grid-column: span 2;
				}
				.landingPageShortCard:hover,
				.landingPageLongCard:hover {
				}
				.landingPageShortCard,
				.landingPageLongCard {
					transition: all 0.3s ease;
				}
				.landingPageLinkGrid {
					display: grid;
					width: 100%;
					max-width: 1600px;
					gap: 16px;
					margin: 0rem 4rem;
					padding-bottom: 48px;
					margin-bottom: 48px;
					border-bottom: 1px solid gray;
				}
				.link-sub-grid {
					display: grid;
					grid-template-columns: 1fr 1fr;
					gap: 16px;
				}
				.newLandingPageLink {
					margin: 0rem 4rem;
					margin-bottom: 5rem;
					width: 100%;
					max-width: 1600px;
				}
				.content-wrapper {
					display: flex;
					flex-direction: column;
					align-items: center;
					padding: 1rem;
				}
				@media screen and (max-width: 769px) {
					.link-sub-grid {
						display: grid;
						grid-template-columns: 1fr;
						gap: 16px;
					}
					.landingPageLinkGrid {
						display: flex;
						flex-direction: column;
					}
					.landingPageCardGrid {
						grid-template-columns: 1fr;
						grid-template-rows: 1fr;
						gap: 16px 0px;
					}
					.landingPageLongCard {
						height: 100%;
						width: 100%;
						display: flex;
						justify-content: center;
					}
					.landingPageShortCard {
						width: 100%;
						display: flex;
						justify-content: center;
					}
				}
			`}</style>
		</>
	);
}
