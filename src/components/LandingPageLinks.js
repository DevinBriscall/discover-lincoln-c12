import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPageCardLink({
	image = "/images/trivia_background.jpg",
	link = "#",
	text = "DISCOVER MORE",
}) {
	return (
		<>
			<Link href={link}>
				<div className="card">
					<span className="text-link">
						{text} <strong>&rarr;</strong>
					</span>
					<Image
						src={image}
						fill
						objectFit="cover"
						alt="image"
						className="card-image"
					/>
				</div>
			</Link>
			<style jsx>{`
				.card {
					width: 100%;
					height: 428px;
					position: relative;
					display: inline-block;
					overflow: hidden;
					border-radius: 8px;
					transition: all 0.3s ease;
				}

				.card:hover {
					transform: scale(1.02);
				}

				.text-link {
					position: absolute;
					top: 20px;
					right: 10px;
					background-color: transparent;
					color: black;
					font-size: 20px;
					font-weight: bold;
					text-decoration: none;
					padding: 4px 8px;
					border-radius: 4px;
					transition: transform 0.2s ease;
					cursor: pointer;
					z-index: 10;
				}

				.text-link strong {
					font-weight: bold;
					color: black;
				}

				.text-link:hover {
					transform: scale(1.05); // slight hover for text
				}

				/*  mobile */
				@media screen and (max-width: 768px) {
					.text-link {
						font-size: 16px;
						top: 5px;
						right: 5px;
					}

					.card {
						height: 300px;
					}
				}
			`}</style>
		</>
	);
}
