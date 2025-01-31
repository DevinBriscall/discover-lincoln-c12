import React from "react";
import Image from "next/image";
export default function AboutUsCard({ data }) {
	return (
		<div className="container">
			<style jsx>
				{`
					.container {
						display: flex;
						flex-direction: column;
						max-width: 30rem;
						background-color: rgba(247, 247, 250, 0.2);
						backdrop-filter: blur(13px);
						border-radius: 4px;
					}

					.picture {
						height: 8rem;
						position: relative;
						background-repeat: no-repeat;
						background-position-x: center;
						background-position-y: center;
						border-top-right-radius: 4px;
						border-top-left-radius: 4px;
					}

					.title {
						height: 4rem;
						display: flex;
						flex-direction: column;
						align-items: center;
						font-size: 2rem;
						font-weight: 600;
					}

					.title-underline {
						height: 1px;
						background-color: #f7f7fa;
						width: 80%;
						border-radius: 100px;
					}

					.description {
						font-weight: 600;
						font-size: 0.9rem;
						padding: 0rem 3rem 1rem;
						border-bottom-left-radius: 4px;
						border-bottom-right-radius: 4px;
					}

					@media screen and (max-width: 768px) {
						.title {
							font-size: 1.75rem;
						}
						.description {
							font-size: 0.7rem;
							padding: 0rem 1rem 1rem;
						}
					}

					@media screen and (max-width: 500px) {
						.title {
							font-size: 1.5rem;
						}
						.description {
							font-size: 0.7rem;
							padding: 0rem 1.3rem 1rem;
						}
					}
				`}
			</style>
			<div className="picture">
				<Image src={data.cardImage.formats.medium.url}
					alt={data.title} 
					fill style={{objectFit: "cover"}} priority loading="eager"/>
			</div>
			<div className="title">
				<h1>{data.title}</h1>
				<div className="title-underline"></div>
			</div>
			<div className="description">
				<p>{data.description}</p>
			</div>
		</div>
	);
}
