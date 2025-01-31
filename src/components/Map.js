import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { DivIcon } from "leaflet";
import ReactDOMServer from "react-dom/server";
import Image from "next/image";
import Link from "next/link";
//position => controls the centering of the map eg. [51.505, -0.09];

//scrollWheelZoom => can the map be zoomed

//pointsOfInterest => our events businesses and attractions to display on the map
/*
pointsOfInterest={[
					{
						id: 1,
						position: [51.505, -0.09],
						type: "event",
						title: "Event McEventface",
						description: "Wow what a great event. A fabulous event.",
					},
					{
						id: 2,
						position: [52.505, -0.09],
						type: "attraction",
						title: "Attraction McAttractionface",
						description: "Wow what a great attraction. A fabulous attraction.",
					},
					{
						id: 3,
						position: [52.605, -0.09],
						type: "business",
						title: "Business McBusinessface",
						description: "Wow what a great business. A fabulous business.",
					},
				]} 
*/

//dragging => true or false | controls if we can drag the map
//zoom => how zoomed in should the map be
//popup => set to false if you don't want to see the popups (maybe on details page)
//onLocationClicked => what happens when you click a marker? I use it to select the proper poi in the feed,

export default function Map({
	position,
	scrollWheelZoom = true,
	pointsOfInterest = [],
	dragging = true,
	zoom = 13,
	popup = true,
	onLocationClicked = () => {},
}) {
	const POITypeMap = {
		event: { icon: faLocationDot, color: "#D83232" },
		attraction: { icon: faLocationDot, color: "var(--purple)" },
		business: { icon: faLocationDot, color: "#342ED9" },
	};

	const markerRefs = useRef([]);

	useEffect(() => {
		const matchingMarkerIndex = pointsOfInterest.findIndex(
			(POI) =>
				POI.location.latitude === position[0] &&
				POI.location.longitude === position[1]
		);

		if (matchingMarkerIndex !== -1) {
			setTimeout(() => {
				markerRefs.current[matchingMarkerIndex]?.openPopup();
			}, 300); // Delay to allow map centering first
		}
	}, [position, pointsOfInterest]);

	return (
		<>
			<MapContainer
				center={position}
				zoom={zoom}
				dragging={dragging}
				scrollWheelZoom={scrollWheelZoom}
				className="h-full w-full"
			>
				<UpdateMapCenter position={position} />
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				{pointsOfInterest.map((POI, index) => (
					<Marker
						key={index}
						position={[POI.location.latitude, POI.location.longitude]}
						icon={
							new DivIcon({
								className: "icon-container",
								html: ReactDOMServer.renderToString(
									<div
										style={{
											display: "flex",
											justifyContent: "center",
											border: "none",
											color: POITypeMap[POI.type].color,
										}}
									>
										<FontAwesomeIcon
											icon={POITypeMap[POI.type].icon}
											size="2x"
										/>
									</div>
								),
								iconSize: [50, 50],
							})
						}
						ref={(el) => (markerRefs.current[index] = el)}
						eventHandlers={{
							click: () => {
								onLocationClicked(POI);
							},
						}}
					>
						{popup && (
							<Popup>
								<div
									className="popup-container"
									style={{
										background: "#ffffff",
										borderRadius: "8px",
										overflow: "hidden",
									}}
									tabIndex={1}
								>
									{/* the image */}
									<div className="image-container relative h-20 w-full rounded">
										<Image
											alt="an image of the point of interest"
											src={POI.images?.[0]?.url || "/images/noPicture.jpg"}
											fill
											objectFit="cover"
											className="image"
										/>
									</div>
									{/* the details */}
									<div className="details-container">
										<span className="title" title={POI.title}>
											{POI.title}
										</span>
										<span className="description scrollbar">
											{POI.description}
										</span>
										<div className="bottom">
											<span title={POI.location.address} className="address">
												📍 {POI.location.address}
											</span>
											<Link href={`poi/${POI.slug}`} tabIndex={1}>
												READ MORE <FontAwesomeIcon icon={faArrowRight} />
											</Link>
										</div>
									</div>
								</div>
							</Popup>
						)}
					</Marker>
				))}
			</MapContainer>

			<style jsx>{`
				.popup-container {
					width: 300px;
				}
				.image-container {
					position: relative;
					height: 5rem;
					width: 100%;
					border-radius: 4px;
				}

				.image {
					border-radius: 4px;
				}

				.details-container {
					padding: 16px 8px 8px 8px;
					display: grid;
					gap: 4px;
					color: var(--charcoal);
				}

				.title {
					font-weight: bold;
					text-transform: uppercase;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					font-size: 14px;
				}

				.description {
					height: 60px;
					overflow-y: auto;
					margin-bottom: 4px;
					font-size: 12px;
				}

				.bottom {
					display: grid;
					grid-template-columns: 2fr 1fr;
					justify-content: space-between;
				}

				.address {
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
				}
			`}</style>
		</>
	);
}

import { useMap } from "react-leaflet";

function UpdateMapCenter({ position }) {
	const map = useMap();

	useEffect(() => {
		map.flyTo(position, 18, {
			animate: true,
			duration: 0.2,
			easeLinearity: 0.5,
		});
	}, [position, map]);

	return null;
}
