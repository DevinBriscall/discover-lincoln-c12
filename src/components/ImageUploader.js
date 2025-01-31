import {
	faChevronLeft,
	faUpload,
	faChevronRight,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState, useEffect } from "react";

let exportfiles = [];
export function getFiles() {
	return exportfiles;
}

export default function ImageUploader({}) {
	const [files, setFiles] = useState([]);
	const [isDragging, setDragging] = useState(false);
	const labelRef = useRef(null);
	const [images, setImages] = useState([]);
	const [currentImage, setCurrentImage] = useState(0);
	const [isHovered, setHovered] = useState(false);

	useEffect(() => {
		const newImages = [];
		files.forEach((file) => {
			newImages.push(URL.createObjectURL(file));
		});
		console.log(newImages);
		exportfiles = files;

		setImages(newImages);
		console.log(exportfiles);

		return () => {
			images.forEach((imageSrc) => URL.revokeObjectURL(imageSrc));
		};
	}, [files]);

	useEffect(() => {
		console.log(currentImage);
		console.log(images);
		console.log(files);
	}, [currentImage]);

	useEffect(() => {
		console.log(currentImage);
		console.log(images);
		console.log(files);
	}, [images]);

	function handleDragEnter(event) {
		event.preventDefault();
		setDragging(true);
	}
	function handleDragOver(event) {
		event.preventDefault();
	}
	function handleDragLeave(event) {
		event.preventDefault();
		//stops the color from changing when you drag over the text
		if (labelRef.current && !labelRef.current.contains(event.relatedTarget)) {
			setDragging(false);
		}
	}
	function handleDrop(event) {
		event.preventDefault();
		console.log(event.dataTransfer.files);
		setDragging(false);
		const newFiles = [...files].concat(Array.from(event.dataTransfer.files));

		console.log(newFiles);
		setFiles(newFiles);
	}
	function handleOnChange(event) {
		event.preventDefault();
		console.log(event.target.files);
		const newFiles = [...files].concat(Array.from(event.target.files));

		console.log(newFiles);
		setFiles(newFiles);
	}

	function handleNextPrev(choice) {
		if (choice === "next") {
			const index = currentImage;
			if (index + 1 < files.length) {
				setCurrentImage(index + 1);
			}
		} else {
			const index = currentImage;
			if (index - 1 >= 0) {
				setCurrentImage(index - 1);
			}
		}
	}

	function handleRemove(index) {
		if (files.length === 1) {
			setFiles([]);
		} else {
			if (index === 0) {
				setFiles(files.slice(index + 1));
			} else if (index === files.length - 1) {
				setFiles(files.slice(0, index));
				setCurrentImage(index - 1);
			} else {
				setFiles(files.slice(0, index).concat(files.slice(index + 1)));
			}
		}
	}
	return (
		<div
			className="image-upload-container"
		>
			<style jsx>
				{`
					.image-upload-container {
						position: relative;
						height: 100%;
						width: 100%;
						border-radius: 4px;
					}

					.image-upload-input {
						height: 100%;
						cursor: pointer;
						display: flex;
						align-items: center;
						justify-content: center;
					}

					.drop-image-area {
						height: 100%;
						background-color: ${!isDragging ? "#D9D9D9" : "var(--light-grey)"};
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						cursor: pointer;
						border-radius: 4px;
						border: 2px dashed black;
						background-image: ${files.length > 0
							? `url(${images[currentImage]})`
							: ""};
						background-size: contain;
						background-repeat: no-repeat;
						background-position: center;
					}

					.drop-text {
						display: flex;
						flex-direction: column;
						gap: 1rem;
						width: 100%;
						height: 100%;
						background-color: ${isDragging || isHovered
							? "rgba(0,0,0,0.5)"
							: ""};
						align-items: center;
						justify-content: center;
						font-size: 1rem;
						text-align: center;
						color: ${isDragging || isHovered
							? "var(--off-white)"
							: files.length === 0
							? "rgba(0,0,0,0.5)"
							: "rgba(0,0,0,0)"};
					}

					.next-previous {
						position: absolute;
						z-index: 10;
						top: 45%;
						background-color: var(--off-white);
						width: 3rem;
						height: 3rem;
						border-radius: 4px;
						box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.2);
					}

					.remove-photo {
						position: absolute;
						z-index: 10;
						top: 1rem;
						right: 1rem;
						width: 1rem;
						height: 1rem;
						border-radius: 4px;
						color: var(--red);
					}

					#next {
						right: 1rem;
					}

					#previous {
						left: 1rem;
					}

					input[type="file"] {
						display: none;
					}
				`}
			</style>
			<label
				htmlFor="imageUploader"
				className="drop-image-area"
				onDragOver={(event) => {
					handleDragOver(event);
				}}
				onDragLeave={(event) => {
					handleDragLeave(event);
				}}
				onDrop={(event) => {
					handleDrop(event);
				}}
				onDragEnter={(event) => {
					handleDragEnter(event);
				}}
				onMouseEnter={() => setHovered(true)}
				onMouseLeave={() => setHovered(false)}
				tabIndex={0}
				onKeyDown={(event) => {
					if (event.key === "Enter") {
						console.log("enter");
						labelRef.current.click();
					}
				}}
				ref={labelRef}
			>
				<div className="drop-text">
					<p>Drop files to upload or Click to Browse</p>
					<FontAwesomeIcon icon={faUpload} />
				</div>
				<input
					id="imageUploader"
					name="imageUploader"
					className="image-upload-input"
					type="file"
					accept="image/*"
					multiple={true}
					onChange={(event) => handleOnChange(event)}
				/>
			</label>
			{files.length > 0 && currentImage + 1 < files.length && (
				<button
					className="next-previous"
					type="button"
					id="next"
					onClick={() => handleNextPrev("next")}
				>
					<FontAwesomeIcon icon={faChevronRight} size="xl" />
				</button>
			)}
			{files.length > 0 && currentImage - 1 >= 0 && (
				<button
					className="next-previous"
					id="previous"
					type="button"
					onClick={() => handleNextPrev("prev")}
				>
					<FontAwesomeIcon icon={faChevronLeft} size="xl" />
				</button>
			)}
			{files.length > 0 && (
				<button
					className="remove-photo"
					id="previous"
					type="button"
					onClick={() => handleRemove(currentImage)}
				>
					<FontAwesomeIcon icon={faXmark} size="xl" />
				</button>
			)}
		</div>
	);
}
