import Counter from "@/components/Counter";
import { faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

//pass me an image and a dope fact and let me cook homeslice

export default function Hero({
	image,
	fact = "Lincoln is in the heart of Ontario's wine country and contributes greatly to the wine industry in the Niagara Peninsula.",
}) {
	return (
		<>
			<div className="hero">
				{/* filter */}
				<div className="filter"></div>

				<div className="header-content">
					{/* Header */}
					<div className="header">
						<h1 className="welcome">WELCOME TO LINCOLN</h1>
						<span className="established">ESTABLISHED 1970</span>
						<span className="fact">{fact}</span>
					</div>

					{/* Population Counter */}
					<div className="population">
						<span>Lincoln, ON</span>
						<div className="count">
							<FontAwesomeIcon icon={faUser} className="w-6 h-6" />
							<Counter number={25719} />
						</div>
					</div>
				</div>
				<button
					className="scroll-prompt animate-bounce"
					aria-label="next section"
					onClick={() =>
						window.scrollTo({
							top: window.innerHeight - 76,
							behavior: "smooth",
						})
					}
				>
					<FontAwesomeIcon icon={faChevronDown} />
				</button>
			</div>

			<style jsx>{`
				.hero {
					height: 100dvh;
					width: 100%;
					background-position: center;
					background-repeat: no-repeat;
					background-size: cover;
					background-image: url(${image});
					padding: 120px 80px;
					display: flex;
					justify-content: center;
				}

				.filter {
					position: absolute;
					inset: 0px;
					background: black;
					opacity: 0.2;
					z-index: 0;
				}

				.header {
					display: grid;
					gap: 0;
					font-weight: bold;
					width: fit-content;
					justify-self: center;
				}

				.welcome {
					font-size: 92px;
					font-size: 6vw;
					color: green;
					width: fit-content;
					margin-bottom: -2vw;
				}

				.established {
					color: white;
					font-size: 60px;
					font-size: 4vw;
					width: fit-content;
					z-index: 1;
				}

				.population {
					font-weight: bold;
					width: 180px;
					color: white;
					position: absolute;
					bottom: 80px;
					right: 60px;
					z-index: 1;
					display: flex;
					flex-direction: column;
					font-size: 24px;
				}

				.count {
					display: flex;
					align-items: center;
					gap: 8px;
				}

				.fact {
					color: white;
					z-index: 1;
					font-size: 20px;
					margin-top: 80px;
					max-width: 600px;
				}

				.scroll-prompt {
					position: absolute;
					color: white;
					font-size: 42px;
					z-index: 1;
					bottom: 32px;
				}

				@media only screen and (max-width: 767px) {
					.population {
						display: none;
					}

					.hero {
						padding: 120px 40px;
					}

					.fact {
						font-size: 12px;
						width: 240px;
					}
				}
			`}</style>
		</>
	);
}
