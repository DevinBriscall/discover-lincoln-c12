import AboutUsCard from "@/components/AboutUsCard";
import LincolnWardMap from "@/components/LincolnWardMap";
import { faCircleQuestion, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import { useMotionValue, useSpring, useTransform, motion } from "framer-motion";
import Image from "next/image";
import Head from "next/head";
/**
 *
 * change the width of the svg from 60% to 90% when the screen width is less than a tablet
 */

export default function About({ data }) {
	console.log(data);
	const [currentOn, setCurrentOn] = useState(false); // if a section has been clicked on the be viewed
	const [whichOn, setWhichOn] = useState(0); //which section has been turned on

	const [sectionHovered, setSectionHovered] = useState(4); // keeps track of which section had been hovered
	const sectionBg = [
		"rgba(155,67,67,0.8)",
		"rgba(31,48,142,0.8)",
		"rgba(117,74,143,0.8)",
		"rgba(29,164,85,0.8)",
		"rgba(0,0,0, 0.5)",
	];

	const [sectionName, setSectionName] = useState("About Us");

	const xPos = useMotionValue(0);
	const yPos = useMotionValue(0);

	const mouseXSpring = useSpring(xPos);
	const mouseYSpring = useSpring(yPos);

	//change the numbers in the [deg, -deg] array to chnage how far the tilt goes for the map
	const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]); // map the values of mouseYSpring to values that are between the degrees specified
	const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]); // map the values of mouseXSpring to values that are between the degrees specified

	const [isMobile, setIsMobile] = useState();

	useEffect(() => {
		// to see if user is on a phone or not
		function checkIsMobile(width) {
			if (width <= 768) {
				setIsMobile(true);
			} else {
				setIsMobile(false);
			}
		}
		checkIsMobile(window.innerWidth);
		window.addEventListener("resize", () => checkIsMobile(window.innerWidth));

		return () => {
			window.removeEventListener("resize", () =>
				checkIsMobile(window.innerWidth)
			);
		};
	}, []);

	function handleMouseMove(event) {
		//gets mouse position based on the percentage of the width and height of the map container
		const rect = event.target.getBoundingClientRect();

		const width = rect.width;
		const height = rect.height;

		const mouseX = event.clientX - rect.left;
		const mouseY = event.clientY - rect.top;

		const mousePercentX = (mouseX / width - 0.5) * 0.5;
		const mousePercentY = (mouseY / height - 0.5) * 0.5;

		xPos.set(mousePercentX);
		yPos.set(mousePercentY);

		console.log(mousePercentX, mousePercentY);
	}

	function handleMouseEnter(section, name) {
		setSectionName(name);
		setSectionHovered(section);
	}

	function sectionClicked(section) {
		setCurrentOn(true);
		setWhichOn(section);
		console.log(whichOn);
	}

	const aboutUsSections = [
		data[0],
		{
			backgroundImage: { url: "/images/andrew-neel-1-29wyvvLJA-unsplash.jpg" },
			title: "History",
			cardImage: {
				url: "/images/mr-cup-fabien-barral-Fo5dTm6ID1Y-unsplash.jpg",
			},
			description:
				"Lincoln, Ontario, is rich in history and agriculture. Originally home to the Neutral Confederacy, it later welcomed European settlers like Jacob Beam, who founded Beamsville in 1788. Mennonite settlers arrived in 1799, establishing Canada’s oldest Mennonite congregation in Vineland. Known as the birthplace of the hockey net in 1898, Lincoln is now celebrated for its award-winning wines, tender fruit, and thriving greenhouse industry. Explore its blend of heritage and modern charm!",
		},
		{
			backgroundImage: { url: "/images/frances-gunn-QcBAZ7VREHQ-unsplash.jpg" },
			title: "Agriculture",
			cardImage: { url: "/images/sam-carter-GHOiyov2TSQ-unsplash.jpg" },
			description:
				"Lincoln boasts a rich agricultural legacy, thanks to its fertile soil, mild climate, and abundant waterways. Early settlers cultivated the land for tender fruits, grains, and livestock, with thriving industries like tanneries, mills, and shipbuilding supporting the community. Today, Lincoln is a leader in tender fruit production and grape growing, with its vineyards producing award-winning wines.",
		},
		{
			backgroundImage: {
				url: "/images/john-rodenn-castillo-a9smyzW_1V4-unsplash.jpg",
			},
			title: "Natural Attractions",
			cardImage: { url: "/images/sebastian-unrau-sp-p7uuT0tw-unsplash.jpg" },
			description:
				"Lincoln is a haven for nature lovers, offering breathtaking landscapes and outdoor adventures. The Niagara Escarpment, a UNESCO World Biosphere Reserve, cuts through the region, providing stunning vistas, hiking trails, and caves to explore. Cave Springs and Ball's Falls Conservation Areas showcase waterfalls, forests, and preserved historic sites, blending natural beauty with cultural heritage. ",
		},
	];
	console.log(aboutUsSections);

	return (
		<>
			<Head>
				<title>Discover Lincoln - About</title>
			</Head>
			<div className="outermost-container">
				<style jsx>
					{`
						.outermost-container {
							background-size: cover;
							background-repeat: no-repeat;
							position: relative;
						}

						.map-container {
							position: absolute;
							top: 5%;
							left: 0;
							display: flex;
							flex-direction: column;
							justify-content: center;
							align-items: center;
							width: 100%;
							z-index: 10;
						}

						.ward-map {
							order: 2;
							width: 100%;
							display: flex;
							justify-content: center;
							padding: 16px 32px;
							border-radius: 16px;
							color: var(--off-white);
						}

						.background-overlay {
							background-color: rgba(0, 0, 0, 0.5);
							height: calc(100dvh - 76px);
							position: relative;
							z-index: 5;
						}

						.title {
							width: 40%;
							text-align: center;
							font-size: 3rem;
							font-weight: bold;
							border-radius: 16px;
							color: var(--off-white);
						}

						.title-container {
							display: flex;
							width: 100%;
							justify-content: space-between;
							align-items: center;
							padding: 0.5rem 2rem;
						}

						.mobile-title {
							display: none;
							padding-top: 0.25rem;
							padding-bottom: 0.25rem;
							padding-left: 0.75rem;
							padding-right: 0.75rem;
							margin-top: 1rem;
							justify-content: center;
							border-radius: 0.5rem;
							width: 40%;
							font-weight: 700;
							background-color: rgba(0, 0, 0, 0.5);
							color: var(--off-white);
						}

						.ward-label {
							background-color: ${sectionBg[sectionHovered]};
							padding-top: 0.5rem;
							padding-bottom: 0.5rem;
							display: flex;
							justify-content: center;
							align-items: center;
							margin-top: 1rem;
							width: 30%;
							height: 2.5rem;
							color: var(--off-white);
							font-weight: bold;
							font-size: 1.5rem;
							border-radius: 16px;
							opacity: ${sectionName !== "" ? 1 : 0};
							box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
						}

						.info-overlay {
							background-color: rgba(0, 0, 0, 0.5);
							width: 100%;
							height: calc(100vh - 76px);
							position: absolute;
							z-index: 20;
							top: 0;
							left: 0;
							color: white;
							display: flex;
							flex-direction: column;
							align-items: center;
						}

						.info-section {
							width: 100%;
							height: calc(100% - 76px);
							display: flex;
							justify-content: end;
							align-items: center;
							padding: 0rem 4rem;
							background-repeat: no-repeat;
							background-position-x: center;
							background-position-y: center;
						}

						.question-button {
							position: fixed;
							order: 1;
							top: 84px;
							color: var(--off-white);
							font-size: 1.8rem;
							align-self: end;
							display: flex;
							flex-direction: row-reverse;
							align-items: center;
							gap: 2px;
							margin-right: 2rem;
						}

						.question-tip {
							color: var(--off-white);
							font-size: 1rem;
							border-radius: 8px;
							display: flex;
							height: 3rem;
							align-items: center;
							padding: 0.5rem 2rem;
							font-weight: bold;
						}

						.info-exit {
							position: relative;
							font-size: 2rem;
							align-self: end;
							cursor: pointer;
							right: 1rem;
							z-index: 100;
						}

						.section-button-container {
							display: flex;
							gap: 1rem;
							font-size: 0.7rem;
							font-weight: bold;
						}

						.section-button {
							color: var(--off-white);
							padding: 0.2rem 0.5rem;
							border-radius: 4px;
							box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
						}

						#wine {
							background-color: rgba(155, 67, 67);
						}

						#hist {
							background-color: rgba(31, 48, 142);
						}

						#agri {
							background-color: rgba(117, 74, 143);
						}

						#natr {
							background-color: rgba(29, 164, 85);
						}

						@media screen and (max-width: 1231px) {
							.ward-label {
								font-size: 1.2rem;
							}
						}

						@media screen and (max-width: 1025px) {
							.title {
								font-size: 2rem;
							}

							.info-exit {
								font-size: 2rem;
							}

							.question-button {
								font-size: 2rem;
							}

							.ward-map {
								width: 90%;
							}

							.ward-label {
								font-size: 0.8rem;
							}

							.info-section {
								justify-content: center;
							}
						}

						@media screen and (max-width: 769px) {
							.title {
								font-size: 1.5rem;
							}

							.question-tip {
								font-size: 0.8rem;
								height: 2rem;
							}

							.info-exit {
								font-size: 1.5rem;
							}

							.ward-label {
								display: none;
							}

							.mobile-title {
								display: flex;
							}

							.ward-map {
								width: 80%;
							}

							.info-section {
								padding: 0.5rem 2rem;
							}
						}

						@media screen and (max-width: 426px) {
							.title {
								font-size: 1rem;
								width: 80%;
								align-self: center;
								margin-left: 0rem;
							}

							.question-tip {
								font-size: 0.5rem;
								padding: 0.5rem 1rem;
							}

							.question-button {
								font-size: 1.25rem;
								margin-right: 0;
							}

							.info-section {
								width: 100%;
								padding: 4px;
							}

							.map-container {
								gap: 1rem;
							}

							.section-button-container {
								font-size: 0.5rem;
							}

							.ward-map {
								width: 90%;
								order: 1;
							}
						}
					`}
				</style>
				<Image
					src={data.aboutPageBackground.url}
					fill
					style={{ objectFit: "cover" }}
				/>
				<div className="background-overlay"></div>
				<div className="map-container">
					<div className="ward-label">{sectionName}</div>
					<div className="mobile-title">
						<p>About Us</p>
					</div>

					{/**had to use tailwind here because motion.div doesnt like styled jsx */}
					<motion.div
						className="w-11/12 md:w-8/12 lg:w-7/12 xl:w-5/12 px-8 py-4 rounded-2xl border-solid border-[#AEAEAE]"
						onMouseMove={(event) => handleMouseMove(event)}
						onMouseLeave={() => {
							xPos.set(0);
							yPos.set(0);
							handleMouseEnter(4, "About Us");
						}}
						style={{
							rotateX,
							rotateY,
							transformStyle: "preserve-3d",
						}}
					>
						<div className="w-full" style={{ transform: "translateZ(25px)" }}>
							<LincolnWardMap
								onClick={sectionClicked}
								onMouseEnter={handleMouseEnter}
							/>
						</div>
					</motion.div>
					{isMobile && (
						<div className="section-button-container">
							<button
								className="section-button"
								id="wine"
								onClick={() => sectionClicked(0)}
							>
								Wine Country
							</button>
							<button
								className="section-button"
								id="hist"
								onClick={() => sectionClicked(1)}
							>
								History
							</button>
							<button
								className="section-button"
								id="agri"
								onClick={() => sectionClicked(2)}
							>
								Agriculture
							</button>
							<button
								className="section-button"
								id="natr"
								onClick={() => sectionClicked(3)}
							>
								Natural Attractions
							</button>
						</div>
					)}
					<div className="question-tip">
						Click a ward to learn something about us.
					</div>
				</div>
				{currentOn && (
					<div
						className="info-overlay"
						style={{
							backgroundImage: `url(${data.section[whichOn].backgroundImage.url})`,
							backgroundPosition: "center",
							backgroundRepeat: "no-repeat",
							backgroundSize: "cover",
						}}
					>
						<div className="absolute inset-0 bg-black opacity-25 z-0"></div>
						<button onClick={() => setCurrentOn(false)} className="info-exit">
							<FontAwesomeIcon icon={faXmark} />
						</button>
						<div className="info-section">
							<div>
								<AboutUsCard data={data.section[whichOn]} />
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}

export async function getServerSideProps() {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/about-us-section?populate[section][populate]=*&populate[aboutPageBackground][populate]=*`
	);
	const data = await res.json();

	return {
		props: {
			data: data.data,
		},
	};
}
