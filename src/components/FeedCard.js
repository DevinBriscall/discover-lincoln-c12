import React, { forwardRef } from "react";
import Image from "next/image";
import { formatDate, formatTime } from "@/utils/POIHelpers";
import BAETags from "./BAETags";

const FeedCard = forwardRef(
	({ pointOfInterest = {}, onClick = () => {} }, ref) => {
		{
			console.log(pointOfInterest.images?.[0]?.url);
		}
		return (
			<>
				<div
					tabIndex={1}
					className={`container shadow-md ${
						pointOfInterest.selected ? "ring" : ""
					}`}
					onClick={onClick}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							onClick();
						}
					}}
					ref={ref}
					id={`feed-card-${pointOfInterest.id}`}
				>
					<div className="image-container">
						<Image
							src={pointOfInterest.images?.[0]?.url || "/images/noPicture.jpg"}
							alt="a picture representing the point of interest"
							layout="fill"
							objectFit="cover"
							className="rounded-l-lg"
						/>
					</div>
					<div className="details">
						<div className="title-and-description">
							<span className="title" title={pointOfInterest.title}>
								{pointOfInterest.title}
							</span>
							<p className="description scrollbar">
								{pointOfInterest.description}
							</p>
						</div>
						<div className="extra-details">
							<span className="extra">
								{pointOfInterest.type === "attraction"
									? `📍 ${pointOfInterest.location.address}`
									: pointOfInterest.type === "event"
									? `📅 Starts ${formatDate(pointOfInterest.startDate)}`
									: `🕖 Open til ${formatTime(pointOfInterest.endTime)}`}
							</span>

							<BAETags type={pointOfInterest.type} />
						</div>
					</div>
				</div>
				<style jsx>{`
					.container {
						width: 100%;
						min-height: 160px;
						background: var(--off-white);
						display: grid;
						grid-template-columns: 2fr 4fr;
						border-radius: 8px;
						overflow: hidden;
						transition: all 0.3s ease;
					}
					.container:hover {
						cursor: pointer;
						transform: scale(1.02);
					}

					.image-container {
						position: relative;
					}

					.details {
						padding: 8px;
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						overflow: hidden;
					}

					.extra-details {
						display: flex;
						justify-content: space-between;
						font-size: 12px;
					}

					.description {
						height: 90px;
						overflow-y: auto;
						font-size: 12px;
					}

					.title-and-description {
						display: flex;
						flex-direction: column;
					}

					.title {
						font-weight: bold;
						text-transform: uppercase;
						margin-bottom: 4px;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.extra {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
				`}</style>
			</>
		);
	}
);

FeedCard.displayName = "FeedCard";

export default FeedCard;
