import {
	faClock,
	faCalendar,
	faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";
import ImageUploader, { getFiles } from "@/components/ImageUploader";
import AddressPicker, { getAddress } from "@/components/AddressPicker";
import axios from "axios";
import toast from "react-hot-toast";
import Head from "next/head";

export default function Index() {
	//a couple states to set us up for step 2
	const [step, setStep] = useState(1);
	const [type, setType] = useState(null);
	const [submitting, setSubmitting] = useState(false);

	const submitForm = async (e) => {
		e.preventDefault();
		setSubmitting(true);

		const formData = new FormData(e.target);
		const payload = Object.fromEntries(formData);
		const locationData = getAddress();
		payload.location = locationData;
		const images = getFiles();

		const imageIds =
			images.length !== 0
				? await toast.promise(uploadImages(images), {
						loading: "Uploading images",
						success: "Images successfully uploaded",
						error: (error) => `${error}`,
						position: "bottom-center",
				  })
				: [];

		console.log(imageIds);
		payload.images = imageIds.data;

		delete payload.imageUploader;

		const cleanedPayload = { ...payload };

		// cleaning up some of the data because strapi wants it like this
		console.log(cleanedPayload);

		cleanedPayload.startTime = payload.startTime + ":00";
		cleanedPayload.endTime = payload.endTime + ":00";
		cleanedPayload.type = type;
		cleanedPayload.slug = payload.title.toLowerCase().replaceAll(" ", "-");

		const res = await fetch(
			`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/point-of-interests?status=draft`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ data: cleanedPayload }),
			}
		);

		const response = await res.json();
		console.log(response);
		if (res.ok) {
			toast.success(
				`your ${type} post has been submitted, please wait for it to be approved`
			);
			setTimeout(() => window.location.reload(), 2000);
		}

		async function uploadImages(images) {
			// used to upload each image onto strapi to get their image id
			return new Promise(async (resolve, reject) => {
				try {
					// Use Promise.all with map to ensure all images are uploaded
					const imageIds = await Promise.all(
						images.map(async (element) => {
							const data = new FormData();
							data.append("files", element);

							const response = await axios.post(
								`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/upload/`,
								data
							);
							console.log(response);
							return { id: response.data[0].id }; // Return image ID after upload
						})
					);

					resolve({ data: imageIds }); // Resolve with all image IDs
				} catch (error) {
					console.log(error);
					reject(`Images were not uploaded: ${error.message}`);
				}
			});
		}

		console.log(payload);
		console.log(locationData);
		console.log(images);
	};

	function fillForm() {
		// Set the title
		document.querySelector('input[name="title"]').value = "Civiconnect";

		// Set the description
		document.querySelector('textarea[name="description"]').value =
			"Bridging the Gap Between Education and Employment.";

		// Set the opening and closing times
		document.querySelector('input[name="startTime"]').value = "09:00";
		document.querySelector('input[name="endTime"]').value = "17:00";

		// Set the website URL
		document.querySelector('input[name="website"]').value =
			"https://www.civiconnect.ca/";

		// Set the email
		document.querySelector('input[name="email"]').value = "info@civiconnect.ca";

		// Set the phone number
		document.querySelector('input[name="phoneNumber"]').value =
			"(289) 270-4997";
	}

	return (
		<>
			<Head>
				<title>Discover Lincoln - Create</title>
			</Head>
			<div className="background">
				<div className="main-content-box">
					{step !== 1 && (
						<button
							className="back-button"
							onClick={() => {
								setStep(1);
							}}
						>
							<FontAwesomeIcon icon={faArrowLeft} size="xl" />
						</button>
					)}

					<div className="grape-accent">
						<Image src={"/images/grapes.svg"} fill alt="grape" />
					</div>
					{step == 1 ? (
						<>
							<div className="header">WHAT ARE YOU LOOKING TO POST?</div>
							<div className="BAE-image-boxes">
								<button
									className="image-box"
									onClick={() => {
										setStep(2);
										setType("event");
									}}
								>
									{/* ADD LINKS TO APPROPRIATE FORMS */}
									<Image
										alt="event"
										src="/images/event-image.png"
										fill
										objectFit="cover"
									></Image>
									<div className="image-box-text">Event</div>
								</button>
								<button
									className="image-box"
									onClick={() => {
										setStep(2);
										setType("attraction");
									}}
								>
									<Image
										alt="attraction"
										src="/images/attraction-image.png"
										fill
										objectFit="cover"
									></Image>
									<div className="image-box-text">Attraction</div>
								</button>
								<button
									className="image-box"
									onClick={() => {
										setStep(2);
										setType("business");
									}}
								>
									<Image
										alt="business"
										src="/images/business-image.png"
										fill
										objectFit="cover"
									></Image>
									<div className="image-box-text">Business</div>
								</button>
							</div>
						</>
					) : (
						<>
							{type === "business" && (
								<button
									className="bg-none text-gray-500 hover:text-white fixed bottom-0 right-12"
									onClick={fillForm}
								>
									auto-fill
								</button>
							)}
							<div className="header">Post Information</div>
							<form onSubmit={submitForm}>
								<div className="main-container">
									<div className="form-wrapper">
										<div className="left-form-column">
											<div className="form-group">
												<label htmlFor="title" className="form-label">
													Title
												</label>
												<input
													type="text"
													name="title"
													placeholder="Title"
													required
												/>
											</div>

											<div className="form-group">
												<label htmlFor="location" className="form-label">
													Location
												</label>
												<div className="w-full">
													<AddressPicker />
												</div>
											</div>

											<div className="form-group">
												<label htmlFor="description" className="form-label">
													Description
												</label>
												<textarea
													name="description"
													className="description-input"
													placeholder="Description"
												></textarea>
											</div>

											{type == "event" && (
												<div className="short-input-grouping">
													<div className="form-group">
														<label htmlFor="startDate" className="form-label">
															Start Date
														</label>
														<div className="input-wrapper">
															<input type="date" name="startDate" required />
														</div>
													</div>

													<div className="form-group">
														<label htmlFor="endDate" className="form-label">
															End Date
														</label>
														<div className="input-wrapper">
															<input type="date" name="endDate" required />
														</div>
													</div>

													<div className="form-group">
														<label htmlFor="startTime" className="form-label">
															Start Time
														</label>
														<input type="time" name="startTime" required />
													</div>

													<div className="form-group">
														<label htmlFor="endTime" className="form-label">
															End Time
														</label>
														<input type="time" name="endTime" />
													</div>
												</div>
											)}
											{type == "attraction" && (
												<div>
													<div className="short-form-group">
														<label htmlFor="startTime" className="form-label">
															Opening Time
														</label>
														<input
															type="time"
															name="startTime"
															className="short-input"
															required
														/>
													</div>

													<div className="short-form-group">
														<label htmlFor="endTime" className="form-label">
															Closing Time
														</label>
														<input
															type="time"
															name="endTime"
															className="short-input"
															required
														/>
													</div>
												</div>
											)}
											{type == "business" && (
												<div>
													<div className="short-form-group">
														<label htmlFor="startTime" className="form-label">
															Opening Time
														</label>
														<input
															type="time"
															name="startTime"
															className="short-input"
															required
														/>
													</div>

													<div className="short-form-group">
														<label htmlFor="endTime" className="form-label">
															Closing Time
														</label>
														<input
															type="time"
															name="endTime"
															className="short-input"
															required
														/>
													</div>
												</div>
											)}
										</div>

										<div className="right-form-column">
											<div className="form-group">
												<label htmlFor="website" className="form-label">
													Website
												</label>
												<input
													type="url"
													name="website"
													className="right-column-input"
													placeholder="Url"
												/>
											</div>

											<div className="form-group">
												<label htmlFor="email" className="form-label">
													Email
												</label>
												<input
													type="email"
													name="email"
													className="right-column-input"
													placeholder="Email"
													required
												/>
											</div>

											<div className="form-group">
												<label htmlFor="phoneNumber" className="form-label">
													Phone Number
												</label>
												<input
													type="tel"
													name="phoneNumber"
													className="right-column-input"
													placeholder="Phone Number"
													required
												/>
											</div>

											<div className="image-upload-group">
												<h1 className="form-label">Image Upload</h1>
												<div className="image-uploader">
													<ImageUploader />
												</div>
											</div>
										</div>
									</div>
									<div className="submit-button-wrapper">
										<button
											type="submit"
											className="submit-button"
											disabled={submitting}
											id={submitting ? "submitting" : ""}
										>
											SUBMIT FOR APPROVAL
										</button>
									</div>
								</div>
							</form>
						</>
					)}
				</div>
			</div>

			<style jsx>{`
				.background {
					min-height: calc(100dvh - 76px);
					height: 100%;
					background-size: cover;
					background-position: center;
					background-image: linear-gradient(
							rgba(0, 0, 0, 0.4),
							rgba(0, 0, 0, 0.4)
						),
						url("/images/CreatePageBacksplash.jpg");
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.main-content-box {
					max-width: 1000px;
					min-height: 400px;
					width: 98dvw;
					height: auto;
					margin: 20px 0px;
					background-color: #f7f7fa33;
					border: 1px solid var(--light-grey);
					border-radius: 16px;
					padding: 32px;
					position: relative;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: stretch;
					text-align: center;
					backdrop-filter: blur(10px);
					-webkit-backdrop-filter: blur(10px);
				}

				.header {
					color: var(--off-white);
					font-size: 2rem;
					font-weight: bold;
				}

				.grape-accent {
					width: 40px;
					height: 40px;
					position: absolute;
					top: 0;
					right: 24px;
					filter: brightness(0) saturate(100%) invert(96%) sepia(27%)
						saturate(153%) hue-rotate(180deg) brightness(100%) contrast(97%);
				}

				.back-button {
					display:flex;
					color: white;
					position: absolute;
				}

				.BAE-image-boxes {
					display: flex;
					height: 100%;
					gap: 40px; //use gap instead of margin between boxes
					padding: 12px 24px;
					flex-direction: row;
					justify-content: center;
					align-items: center;

				}

				.address-picker{
					width: 100%;
					border-radius: 4px;
				}

				.image-box {
					width: 100%;
					height: 250px; 
					max-height: 250px;
					margin: 40px 0px;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 8px;
					overflow: hidden;
					position: relative;
					cursor: pointer;
				}

				.image-box-text {
					top: 50%;
					left: 50%;
					position: absolute;
					transform: translate(-50%, -50%);
					color: var(--off-white);
					font-size: 1.8rem;
					font-weight: bold;
					text-transform: uppercase;
				}

				.main-container {
					display: flex;
					gap: 20px;
					flex-direction: column;
					justify-content: center;
					align-items: flex-start;
				}

				.form-wrapper{
					display: flex;
					gap: 40px;
					width: 100%;
					flex-direction: row;
					justify-content: center;
					align-items: flex-start;
				}

				.submit-button-wrapper{
					display: flex;
					justify-content: center;
					align-items: center;
					width: 100%;
				}

				.left-form-column {
					display: flex;
					flex-direction: column;
					width: 100%;
					gap: 10px;
				
				}

				.right-form-column{
					width: 100%;
					display: flex;
					flex-direction: column;
					gap: 10px;
					height: auto;
				}

				.form-label {
					font-size: 14px; 
					font-weight: bold; 
					color: white; 
				}

				.form-group {
					display: flex;
					flex-direction: column;  
					align-items: flex-start;
					position: relative;
				}

				.short-form-group{
					display: flex;
					flex: 1;
					flex-direction: column;
					align-items: flex-start;
					juss
					width 100%;
					
				}

				.image-upload-group {
					display: flex;
					flex-direction: column;  
					align-items: flex-start;
					position: relative;
					height: 170px;
				}

				input, textarea {
					border-radius: 4px; 
					width: 100%;
					padding: 2px 4px;
				}

				textarea {
					resize: none;
				}

				.input-wrapper{
					position: relative;
					display: flex;
					align-items: center;
					width: 100%;
					gap: 5px;
				}

				.input-icon {
					position: absolute;
					right: 10px; 
					color: black;
					pointer-events: none; 
					font-size: 18px;
				}

				.short-input{
					width: 100%;
				}

				.description-input {
					display: flex;
					align-items: flex-start; 
    				justify-content: flex-start; 
					width: 100%;
  					height: 80px; 
				}

				.short-input-grouping {
					display: grid;            
  					grid-template-columns: repeat(2, 1fr); 
  					gap: 16px;          
				}

				.submit-button {
					background-color: #2c715c;  
					color: white;  
					border: none;  
					padding: 10px 24px;  
					margin-top: 10px;
					font-size: 16px;  
					font-weight: bold;  
					border-radius: 8px;  
					cursor: pointer; 
				}

				.image-uploader {
					flex: 1;
					width: 100%;
				}

				#submitting{
					background-color: var(--light-grey);
				}

				@media (max-width: 768px) {
					.background{
						height: auto;
					}
				
					.main-content-box {
						width: 100%;
						border-radius: 0;
						padding: 40px 16px;
						height: auto;
						margin-top: 50px;
						margin-bottom: 50px
					}

					.BAE-image-boxes {
						display: flex;
						flex-direction: column;
						align-items: center;
						gap: 16px;
						width: 100%;
						height: 90%;
					}

					.image-box {
						width: 90%;
						margin: 8px 0;
						height: 150px;
						display: flex;
						justify-content: center;
						align-items: center;
					}

					.image-box-text {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						color: white;
						font-size: 1.2rem;
						font-weight: bold;
					}

					.header {
						font-size: 1.5rem;
						line-height: 1.2;
						text-align: center;
						margin-right: 16px;
					}

					.main-container {
						display: flex;
						flex-direction: column; 
						gap: 20px; 
						justify-content: center;
						align-items: center; 
					}

					.form-wrapper {
						display: flex;
						flex-direction: column; 
						gap: 20px; 
						justify-content: center;
						align-items: stretch; 
						width: 100%; 
					}

					.left-form-column, .right-form-column {
						width: 100%; 
					}

					.submit-button-wrapper {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 100%;
						margin-top: 20px; 
					}

					.submit-button {
						width: 80%;
						padding: 12px 20px;
						font-size: 16px;
						font-weight: bold;
						border-radius: 15px;
						cursor: pointer;
				}
				@media (max-width: 400px) {
				input, textarea {
					font-size: 12px;
				} }

			`}</style>
		</>
	);
}
