import {
	faArrowRight,
	faCalendar,
	faClock,
	faLocationArrow,
	faLocationCrosshairs,
	faLocationDot,
	faLocationPin,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BAETags from "./BAETags";
import Link from "next/link";
import { formatDate } from "@/utils/POIHelpers";
import { formatTime } from "@/utils/POIHelpers";

export default function LandingpageCard({ pointOfInterest = {} }) {
	return (
		<Link
			href={pointOfInterest ? `/poi/${pointOfInterest.slug}` : "#"}
			className="w-full"
		>
			<div className="container">
				<style jsx>
					{`
						.container {
							background-image: url(${pointOfInterest?.images[0]?.url ||
							"/images/noPicture.jpg"});
							background-size: cover;
							background-repeat: no-repeat;
							background-position-x: center;
							background-position-y: center;
							width: 100%;
							height: 428px;
							border-radius: 4px;
							box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
							transition: all 0.3s ease;
						}

						.container:hover {
							transform: scale(1.02);
						}

						.overlay {
							background-color: rgba(0, 0, 0, 0.5);
							position: relative;
							top: 0;
							left: 0;
							height: 100%;
							border-radius: 4px;
							z-index: 10;
							color: var(--off-white);
							display: flex;
							flex-direction: column;
							justify-content: space-between;
							padding: 2rem 2rem 1rem 2rem;
						}

						.title-container {
							display: flex;
							flex-direction: column;
							gap: 0.2rem;
						}

						.title {
							font-size: 2rem;
							font-weight: bold;
							text-transform: uppercase;
						}

						.description {
							width: 100%;
							display: -webkit-box;
							-webkit-line-clamp: 3;
							-webkit-box-orient: vertical;
							overflow: hidden;
							text-overflow: ellipsis;
						}

						.bottom-details-container {
							display: flex;
							justify-content: space-between;
							align-items: center;
						}

						.extra-details {
							display: flex;
							align-items: center;
							gap: 0.5rem;
							font-size: 1rem;
							font-weight: 700;
						}

						.icon {
							font-size: 1.5rem;
						}

						@media screen and (max-width: 1025px) {
							.title {
								font-size: 1.3rem;
							}

							.icon {
								font-size: 1rem;
							}
						}

						@media screen and (max-width: 769px) {
							.title {
								font-size: 1rem;
							}
							.description {
								font-size: 0.7rem;
							}
							.extra-details {
								font-size: 0.7rem;
							}
						}
					`}
				</style>
				<div className="overlay">
					<div className="title-container">
						<h1 className="title">{pointOfInterest.title}</h1>
						<BAETags type={pointOfInterest.type} />
						<p className="description">{pointOfInterest.description}</p>
					</div>
					<div className="bottom-details-container">
						{pointOfInterest.type === "event" ? (
							<div className="extra-details">
								<div className="icon">
									<FontAwesomeIcon icon={faCalendar} />
								</div>
								<h3>Starts {formatDate(pointOfInterest.startDate)}</h3>
							</div>
						) : pointOfInterest.type === "attraction" ? (
							<div className="extra-details">
								<div className="icon">
									<FontAwesomeIcon icon={faLocationDot} />
								</div>

								<h3>{pointOfInterest.location.address}</h3>
							</div>
						) : (
							<div className="extra-details">
								<div className="icon">
									<FontAwesomeIcon icon={faClock} />
								</div>
								<h3>
									Open from {formatTime(pointOfInterest.startTime)} to{" "}
									{formatTime(pointOfInterest.endTime)}
								</h3>
							</div>
						)}
						<div style={{ fontSize: "1.5rem" }}>
							<FontAwesomeIcon icon={faArrowRight} />
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
