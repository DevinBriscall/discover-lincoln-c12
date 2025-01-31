import Carousel from "react-multi-carousel";
import React from "react";
import Image from "next/image";
import "react-multi-carousel/lib/styles.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faChevronRight,
	faXmark,
	faChevronLeft,
	faImage,
	faImages,
	faImagePortrait,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

export default function ImageGallery({ images = [] }) {
	const [isGalleryOn, setGalleryOn] = useState(false);
	const [imageArray, setImageArray] = useState([]);
	const [selectedPicture, setSelectedPic] = useState();
	const [isMobile, setIsMobile] = useState();

	useEffect(() => {
		// checks if there is an image inside the images prop
		if (images !== null && images.length > 0) {
			setSelectedPic(imageArray[0]);
			setImageArray(images);
		}
		console.log(imageArray);
		console.log(images)
	}, [images]);

	const responsive = {
		desktop: {
			breakpoint: { max: 9999, min: 0 },
			items: 1,
		},
	};

	useEffect(() => {
		// change the selected picture when swapping pics
		console.log(imageArray);
		setSelectedPic(imageArray[0]);
		console.log(imageArray.length);
	}, [imageArray]);

	useEffect(() => {
		if (isGalleryOn) {
			// disable scrolling when gallery is in view
			document.body.style.overflowY = "hidden";
		} else {
			document.body.style.overflowY = "";
		}
		return () => {
			document.body.style.overflow = ""; // make sure it always enable scrolling after the gallery is off
		};
	}, [isGalleryOn]);

	useEffect(() => {
		// to see if user is on a phone or not
		function checkIsMobile(width) {
			console.log(width);
			if (width <= 426) {
				setIsMobile(true);
			} else {
				setIsMobile(false);
			}
		}

		checkIsMobile(window.innerWidth)

		window.addEventListener("resize", () => checkIsMobile(window.innerWidth));

		return () => {
			window.removeEventListener("resize", () =>
				checkIsMobile(window.innerWidth)
			);
		};
	}, []);

	const CustomRightArrow = ({ onClick, ...rest }) => {
		return (
			<button className="button" onClick={() => onClick()}>
				<style jsx>
					{`
						.button {
							position: absolute;
							right: 2.5rem;
							display: flex;
							height: 3rem;
							width: 3rem;
							cursor: pointer;
							align-items: center;
							justify-content: center;
							border-radius: 100px;
							border: 1px solid var(--light-grey);
							background-color: var(--off-white);
							font-size: 1.25rem;
							line-height: 1.75rem;
							color: var(--purple);
							translate: 0px;
							transition: translate 0.3s ease-in-out;
							box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
						}

						.button:hover {
							translate: 10px;
						}

						@media screen and (max-width: 1024px) {
							.button {
								right: 1rem;
							}
						}
					`}
				</style>
				<FontAwesomeIcon icon={faChevronRight} size="xl" />
			</button>
		);
	};

	const CustomLeftArrow = ({ onClick, ...rest }) => {
		return (
			<button className="button" onClick={() => onClick()}>
				<style jsx>
					{`
						.button {
							position: absolute;
							left: 2.5rem;
							display: flex;
							height: 3rem;
							width: 3rem;
							cursor: pointer;
							align-items: center;
							justify-content: center;
							border-radius: 100px;
							border: 1px solid var(--light-grey);
							font-size: 1.25rem;
							line-height: 1.75rem;
							color: var(--purple);
							background-color: var(--off-white);
							translate: 0px;
							transition: translate 0.3s ease-in-out;
							box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
						}

						.button:hover {
							translate: -10px;
						}

						@media screen and (max-width: 1024px) {
							.button {
								left: 1rem;
							}
						}
					`}
				</style>
				<FontAwesomeIcon icon={faChevronLeft} size="xl" />
			</button>
		);
	};

	const CustomButtonGroup = ({ carouselState }) => {
		console.log(carouselState);
		return (
			<div className="button-group">
				<style jsx>
					{`
						.button-group {
							position: absolute;
							width: 100%;
							display: flex;
							justify-content: center;
							top: 0px;
							font-weight: bold;
							padding: 0.5rem 1rem;
							color: var(--off-white);
						}

						.slide-number {
							background-color: rgba(0, 0, 0, 0.6);
							padding: 0.5rem 1rem;
							border-radius: 4px;
						}
					`}
				</style>
				<h1 className="slide-number">
					{carouselState.currentSlide + 1} / {carouselState.totalItems}
				</h1>
			</div>
		);
	};

	function NoPicture({ small = false }) {
		return (
			<div className="no-picture-container">
				<style jsx>
					{`
						.no-picture-container {
							background-color: var(--light-grey);
							width: 100%;
							height: 100%;
							color: var(--off-white);
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
							text-align: center;
							font-weight: bold;
							border-radius: 4px;
							box-shadow: ${small ? "0px 4px 4px rgba(0,0,0,0.2)" : ""};
							font-size: ${small ? "1vw" : "2rem"};
						}

						@media screen and (max-width: 769px) {
							.no-picture-container {
								font-size: ${small ? "0.8rem" : "2rem"};
							}
						}
					`}
				</style>
				<FontAwesomeIcon icon={faImage} />
				<h1>No Images Provided</h1>
			</div>
		);
	}

	return (
		<div className="image-gallery-container">
			<style jsx>
				{`
					.image-gallery-container {
						height: 100%;
						width: 100%;
					}

					.picture-container {
						height: 100vh;
						width: 80%;
						border-radius: 8px;
						position: relative;
					}

					.carousel-container {
						background-color: rgba(0, 0, 0, 0.8);
						position: absolute;
						width: 100%;
						height: 100%;
						top: 0px;
						left: 0px;
						z-index: 99999;
					}

					.exit-gallery {
						height: 2rem;
						width: 100%;
						margin-top: 1rem;
						padding-right: 1rem;
						display: flex;
						justify-content: end;
						position: absolute;
						z-index: 30;
					}

					.exit-button {
						color: var(--off-white);
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 2rem;
					}

					.inner-container {
						position: absolute;
						width: 100%;
						top: 0px;
						left: 0px;
						z-index: 20;
					}

					.image-display-container {
						display: grid;
						gap: 1rem;
						grid-template-columns: 1fr 1fr 1fr 1fr;
						grid-template-rows: 1fr;
						height: 100%;
						width: 100%;
					}

					.big-picture {
						grid-column: span 3;
						width: 100%;
						height: 100%;
						position: relative;
						box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
						border-radius: 4px;
					}

					.small-picture-container {
						grid-column: span 1;
						display: grid;
						grid-template-columns: 1fr;
						grid-template-rows: 1fr 1fr 1fr 1fr;
						gap: 1rem;
					}

					.small-picture {
						position: relative;
						box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
						border-radius: 4px;
					}

					.gallery-button {
						background-color: var(--light-grey);
						color: var(--off-white);
						display: flex;
						justify-content: center;
						align-items: center;
						font-size: 1.5rem;
						font-weight: bold;
						gap: 0.3rem;
						border-radius: 4px;
						box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
					}

					@media screen and (max-width: 769px) {
						.picture-container {
							width: 100%;
						}

						.image-display-container {
							grid-template-rows: 1fr 1fr 1fr 1fr;
							grid-template-columns: 1fr;
							gap: 1rem 0rem;
						}

						.gallery-button {
							font-size: 0.8rem;
						}

						.small-picture-container {
							grid-template-rows: 9rem;
							grid-template-columns: 1fr 1fr 1fr 1fr;
						}

						.big-picture {
							grid-row: 1 / span 3;
						}
					}

					@media screen and (max-width: 426px) {
						.small-picture-container {
							grid-template-rows: 9rem;
							grid-template-columns: 1fr 1fr 1fr;
						}
					}

					@media screen and (max-width: 769px) {
						.small-picture-container {
							grid-template-rows: 5rem;
						}
					}
				`}
			</style>
			<div className="image-display-container">
				<div className="small-picture-container">
					{images !== null && (!isMobile
						? imageArray.length >= 1 && imageArray.length <=4 // if this is not a mobile view, if there are 1-4 images
							? imageArray.map((image, index) => (
									<button
										key={index}
										className="small-picture"
										onClick={() => setSelectedPic(image)}
									>
										<Image
											src={image.url}
											alt={"oh no it broke :("}
											fill
											style={{ objectFit: "cover", borderRadius: "4px" }}
											loading="eager"
										/>
									</button>
							  ))
							: imageArray.slice(0, 3).map((image, index) => ( // display the first 3 images and leave one space for the gallery button
										<button
											key={index}
											className="small-picture"
											onClick={() => setSelectedPic(image)}
										>
											<Image
												src={image.url}
												alt={"oh no it broke :("}
												fill
												style={{ objectFit: "cover", borderRadius: "4px" }}
												loading="eager"
											/>
										</button>
							))
							
						: imageArray.length >= 1 && imageArray.length < 4 //if this is a mobile view, if there are 1-3
							? imageArray.map((image, index) => (
									<button
										key={index}
										className="small-picture"
										onClick={() => setSelectedPic(image)}
									>
										<Image
											src={image.url}
											alt={"oh no it broke :("}
											fill
											style={{ objectFit: "cover", borderRadius: "4px" }}
											loading="eager"
											/>
									</button>
							))
							: imageArray.slice(0, 2).map((image, index) => ( // otherwise display the first 2 and leave one space for the gallery button
									<button
										key={index}
										className="small-picture"
										onClick={() => setSelectedPic(image)}
									>
										<Image
											src={image.url}
											alt={"oh no it broke :("}
											fill
											style={{ objectFit: "cover", borderRadius: "4px" }}
											loading="eager"
											/>
									</button>
							))
					)}
					{images !== null && (!isMobile ? imageArray.length >= 5 && ( //if this is no mobile, if there are 5 or more images
							<button
								className="gallery-button"
								onClick={() => {
									setGalleryOn(true);
									window.scrollTo(0, 0);
								}}
							>
								<FontAwesomeIcon icon={faImages} />
								<p>{imageArray.length - 3}+</p>
							</button>
						)
						:
						imageArray.length >= 4 && ( // if this is the mobile view and there are 4 or more images
							<button
								className="gallery-button"
								onClick={() => {
									setGalleryOn(true);
									window.scrollTo(0, 0);
								}}
							>
								<FontAwesomeIcon icon={faImages} />
								<p>{imageArray.length - 2}+</p>
							</button>
						))
					}
					{images === null &&(
						!isMobile ? 
						[1,2,3,4].map(()=><NoPicture small/>) :
						[1,2,3].map(()=><NoPicture small/>)
					)

					}
				</div>
				<div className="big-picture">
					{selectedPicture && selectedPicture.url ? (
						<Image
							alt="selected image"
							src={selectedPicture.url}
							fill
							style={{ objectFit: "cover", borderRadius: "4px" }}
							loading="eager"
							/>
					) : (
						images === null && <NoPicture />
					)}
				</div>
			</div>
			{isGalleryOn && (
				<div className="carousel-container">
					<div className="exit-gallery">
						<button className="exit-button" onClick={() => setGalleryOn(false)}>
							<FontAwesomeIcon icon={faXmark} />
						</button>
					</div>

					<div className="inner-container">
						<Carousel
							responsive={responsive}
							itemClass="flex justify-center"
							customRightArrow={<CustomRightArrow />}
							customLeftArrow={<CustomLeftArrow />}
							customButtonGroup={<CustomButtonGroup />}
						>
							{images.map((element, index) => (
								<div className="picture-container" key={index}>
									<Image
										alt="displayed picture"
										src={element.url}
										fill
										style={{ objectFit: "contain" }}
										loading="eager"
									/>
								</div>
							))}
						</Carousel>
					</div>
				</div>
			)}
		</div>
	);
}
