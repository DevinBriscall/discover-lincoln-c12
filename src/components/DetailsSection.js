import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BAETags from "./BAETags";
import {
	faCalendar,
	faClock,
	faEnvelope,
	faLink,
	faLocationDot,
	faPhone,
	faShare,
	faShareNodes,
} from "@fortawesome/free-solid-svg-icons";
import { formatDate, formatPhone, samplePOIs } from "@/utils/POIHelpers";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic.js";
import { formatTime } from "@/utils/POIHelpers";
import Link from "next/link";
const Map = dynamic(() => import("../components/Map.js"), {
	ssr: false,
});
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function DetailSection({ data }) {
	const [isMobile, setIsMobile] = useState();

	useEffect(() => {
		// to see if user is on a phone or not
		function checkIsMobile(width) {
			console.log(width <= 769);
			if (width <= 769) {
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
	return (
		<div className="details-container">
			<style jsx>
				{`
					.details-container {
						display: grid;
						grid-template-rows: auto 0.5fr 1fr 0.5fr 1fr 1fr;
						gap: 0.5rem;
						height: 100%;
						width: 100%;
					}

					.tag-share {
						display: flex;
						justify-content: space-between;
						align-items: center;
					}

					.top-details {
						display: flex;
						flex-direction: column;
						gap: 1rem;
					}

					.title {
						text-transform: uppercase;
						font-weight: 700;
						font-size: 2rem;
					}

					.location-time {
						display: flex;
						justify-content: space-between;
						gap: 0.5rem;
						font-weight: 700;
						font-size: 0.8rem;
					}

					.location {
						display: flex;
						align-items: center;
						gap: 0.5rem;
					}

					.description {
						grid-row: span 2;
						font-size: 1rem;
						height: 100%;
						overflow-y: auto;
					}

					.date {
						display: flex;
						gap: 0.5rem;
						align-items: center;
						text-align: center;
					}

					.time {
						display: flex;
						gap: 0.5rem;
						align-items: center;
						text-align: center;
					}

					.contact-container {
						display: flex;
						flex-direction: column;
						font-size: 0.8rem;
						gap: 0.4rem;
					}

					.owner-info {
						display: flex;
						flex-direction: column;
						font-weight: 700;
					}

					.contact-share {
						display: flex;
						justify-content: space-between;
						font-weight: 400;
					}

					.contact-info {
						display: flex;
						gap: 1rem;
					}

					.share-button {
						display: flex;
						align-items: center;
						justify-content: center;
						gap: 0.5rem;
						font-weight: 700;
						background-color: var(--green);
						height: 2rem;
						color: var(--off-white);
						border-radius: 4px;
						padding: 0.2rem 1rem;
						align-self: end;
						box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
					}

					.mobile-share {
						color: var(--light-grey);
					}

					.map-container {
						height: 100%;
						min-height: 200px;
						grid-row: span 2;
						box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
					}

					@media screen and (max-width: 1025px) {
						.location-time {
							font-size: 0.8rem;
						}
					}

					@media screen and (max-width: 769px) {
						.details-container {
							grid-template-rows: 1fr 1fr 100px 200px 1fr 1fr;
						}

						.top-details {
							align-self: center;
						}

						.location-time {
							flex-direction: column;
						}

						.date-time {
							justify-content: start;
						}

						.owner-info {
							justify-content: center;
							align-self: center;
						}
					}

					@media screen and (max-width: 426px) {
						.details-container {
							grid-template-rows: 350px 1fr 100px 200px 1fr 1fr;
						}
					}
				`}
			</style>

			<div className="top-details">
				<div className="tag-share">
					<BAETags type={data.type} />
					{isMobile && (
						<button
							className="mobile-button"
							onClick={() =>
								window.navigator.clipboard.writeText(window.location.href).then(
									(value) => {
										toast.success("Copied link onto clipboard");
									},
									(error) => {
										toast.error("Unable to copy link to clipboard");
									}
								)
							}
						>
							<FontAwesomeIcon icon={faShareNodes} className="w-4 h-4" />
						</button>
					)}
				</div>
				<h1 className="title">{data.title}</h1>
				<div className="location-time">
					<div className="location">
						<FontAwesomeIcon icon={faLocationDot} className="w-4 h-4" />
						<p>{data.location.address}</p>
					</div>
					{data.type === "event" && (
						<div className="date">
							<FontAwesomeIcon icon={faCalendar} className="w-4 h-4" />
							<p>{formatDate(data.startDate)}</p>-
							<p>{formatDate(data.endDate)}</p>
						</div>
					)}
					<div className="time">
						<FontAwesomeIcon icon={faClock} className="w-4 h-4" />
						<p>{formatTime(data.startTime)}</p>-
						<p>{formatTime(data.endTime)}</p>
					</div>
				</div>
			</div>
			{data.description !== "" ? (
				<div className="description scrollbar">{data.description}</div>
			) : (
				<div className="text-gray-400 italic">no description</div>
			)}
			<div className="owner-info">
				<h2>Owner Information</h2>
				<div className="contact-share">
					<div className="contact-container">
						<div className="contact-info">
							<FontAwesomeIcon
								icon={faPhone}
								className="w-4 h-4 text-gray-500"
							/>
							<p>{formatPhone(data.phoneNumber)}</p>
						</div>
						<div className="contact-info">
							<FontAwesomeIcon
								icon={faEnvelope}
								className="w-4 h-4 text-gray-500"
							/>
							<p>{data.email}</p>
						</div>
						{data.website !== "" && (
							<div className="contact-info">
								<FontAwesomeIcon
									icon={faLink}
									className="w-4 h-4 text-gray-500"
								/>
								<a
									href={
										data.website.startsWith("http")
											? data.website
											: `https://${data.website}`
									}
									target="_blank"
									className="max-w-[320px] text-ellipsis underline"
								>
									Click to Visit Website
								</a>
							</div>
						)}
					</div>
					{!isMobile && (
						<button
							className="share-button"
							onClick={() =>
								window.navigator.clipboard.writeText(window.location.href).then(
									(value) => {
										toast.success("Copied link onto clipboard");
									},
									(error) => {
										toast.error("Unable to copy link to clipboard");
									}
								)
							}
						>
							<h1>SHARE</h1>
							<FontAwesomeIcon icon={faShareNodes} className="w-5 h-5" />
						</button>
					)}
				</div>
			</div>
			<div className="map-container">
				<Map
					position={[data.location.latitude, data.location.longitude]}
					pointsOfInterest={[data]}
					popup={false}
				/>
			</div>
		</div>
	);
}
