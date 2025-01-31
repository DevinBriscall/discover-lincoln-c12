import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic.js";
import FeedCard from "@/components/FeedCard.js";
import { filterByDateRange, samplePOIs } from "@/utils/POIHelpers.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faExpand,
	faUpRightAndDownLeftFromCenter,
} from "@fortawesome/free-solid-svg-icons";
import Filters from "@/components/Filters.js";
import Head from "next/head.js";

const Map = dynamic(() => import("../components/Map.js"), {
	ssr: false,
});

export default function Feed() {
	const [position, setPosition] = useState([43.1646921, -79.478742]);
	const [expanded, setExpanded] = useState(false);
	const feedCardRefs = useRef([]);
	const cardContainerRef = useRef(null);
	const [allPOIs, setPOIs] = useState([]);

	const [currentPOIs, setCurrentPOIs] = useState(allPOIs);

	//Pull POIs from Strapi
	useEffect(() => {
		async function fetchPOIs() {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/point-of-interests?populate=*&sort=createdAt:desc`
				);

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const data = await response.json();
				console.log(data.data);
				setPOIs(data.data);
				handleSelected(data.data, data.data[0]);
				handleFeedCardClicked(data.data[0]);
				setCurrentPOIs(data.data);
			} catch (error) {
				console.error("Failed to fetch POIs from Strapi:", error);
			}
		}

		fetchPOIs();
	}, []);

	function handleSelected(pointsOfInterest, poi) {
		pointsOfInterest.forEach(
			(p) => (p.selected = p.type === poi.type && p.id === poi.id)
		);
		setCurrentPOIs(pointsOfInterest);
	}

	function handleFeedCardClicked(poi, noScroll = false) {
		setPosition([poi.location.latitude, poi.location.longitude]);
		handleSelected(currentPOIs, poi);

		const selectedCardRef = feedCardRefs.current.find(
			(ref) => ref && ref.id === `feed-card-${poi.id}`
		);

		if (selectedCardRef && cardContainerRef.current && !noScroll) {
			const containerRect = cardContainerRef.current.getBoundingClientRect();
			const cardRect = selectedCardRef.getBoundingClientRect();
			const offset = 70;

			cardContainerRef.current.scrollTo({
				top:
					cardContainerRef.current.scrollTop +
					(cardRect.top - containerRect.top - offset),
				behavior: "smooth",
			});
		}
	}

	//FILTERS
	function handleFiltersChange(filters) {
		const filteredPOIs = filterByDateRange(
			allPOIs.filter(
				(poi) =>
					poi.title
						.toLowerCase()
						.includes(filters.searchString.toLowerCase()) &&
					(filters.selected.includes(poi.type) || !filters.selected.length)
			),
			filters.startDate,
			filters.endDate
		);

		if (filteredPOIs.length) {
			handleFeedCardClicked(filteredPOIs[0], true);
		}
		setCurrentPOIs(filteredPOIs);
	}

	return (
		<>
			<Head>
				<title>Discover Lincoln - Feed</title>
			</Head>
			<div className="page-container">
				<div className="feed-container scrollbar" ref={cardContainerRef}>
					<div className="header">
						<span>FEED</span>
						<button className="extend">
							<FontAwesomeIcon
								icon={faUpRightAndDownLeftFromCenter}
								onClick={() => setExpanded(!expanded)}
								className="extend"
							/>
						</button>
					</div>
					<Filters onChange={(filters) => handleFiltersChange(filters)} />

					{currentPOIs.map((poi, i) => (
						<FeedCard
							key={i}
							pointOfInterest={poi}
							onClick={() => handleFeedCardClicked(poi)}
							ref={(el) => (feedCardRefs.current[i] = el)} // Store each DOM node in the array
						/>
					))}
				</div>
				<Map
					position={position}
					pointsOfInterest={currentPOIs}
					zoom={15}
					onLocationClicked={(poi) => handleFeedCardClicked(poi)}
				/>
			</div>

			<style jsx>{`
				.page-container {
					display: flex;
					height: calc(100vh - 76px);
					width: 100%;
				}

				.feed-container {
					padding: 1rem;
					display: flex;
					flex-direction: column;
					gap: 1rem;
					overflow-y: auto;
					overflow-x: hidden;
					scrollbar-width: thin;
					width: 33%;
					min-width: 500px;
				}

				.header {
					display: flex;
					position: sticky;
					top: -1rem;
					z-index: 9998;
					justify-content: space-between;
					align-items: center;
					background: #fff;
					border-bottom: 1px solid var(--light-grey);
					border-top: 1px solid var(--off-white);
					width: calc(100% + 2rem); /* Extend header width */
					margin-top: -2rem; /* Offset container padding */
					padding: 1rem; /* Restore internal padding */
					margin-left: -1rem;
					margin-bottom: 8px;
				}

				.extend {
					display: none;
				}

				@media only screen and (max-width: 1023px) {
					.page-container {
						flex-direction: column;
					}
					.feed-container {
						order: 2;
						height: ${expanded ? "300%" : "9%"};
						min-width: 100%;
						align-items: center;
						border-radius: 8px 8px 0px 0px;
						background: #fff;
						transition: all 0.3s ease;
						margin-top: -20px; /* Overlap with map */
					}
					.header {
						margin-left: 0;
					}

					.extend {
						display: block;
					}
				}
			`}</style>
		</>
	);
}
