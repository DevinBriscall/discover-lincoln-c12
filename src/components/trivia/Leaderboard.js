import React, { useEffect, useState } from "react";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
//mode 0 for lincoln-gusser styling
//mode 1 for homepage styling

export default function Leaderboard({ mode = 0, userScore }) {
	const [top3, setTop3] = useState([
		{ alias: "Jim", score: 20000 },
		{ alias: "Joe", score: 19000 },
		{ alias: "Jane", score: 18000 },
	]);
	const userScoreInTop3 = userScore && userScore.place <= 3;

	useEffect(() => {
		async function getScores() {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/trivia-scores?populate=*&sort=score:desc&pagination[pageSize]=3`
				);
				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}
				const data = await response.json();
				setTop3(
					data.data.map((score) => {
						return {
							alias: score.alias,
							score: score.score,
						};
					})
				);
			} catch (error) {
				console.log("Failed to fetch data from Strapi:", error);
			}
		}

		getScores();
	}, []);

	return (
		<>
			<div className="leaderboard-container">
				<div className="grid">
					{top3.length > 0 &&
						top3.map((entry, index) => {
							return (
								<div key={index} className="grid-row">
									<div className={`cell${index + 1}-1 cell`}>
										<FontAwesomeIcon icon={faCrown} />
									</div>
									<div className={`cell${index + 1}-2 cell`}>{entry.alias}</div>
									<div className={`cell${index + 1}-3 cell`}>{entry.score}</div>
								</div>
							);
						})}

					{/* ... user */}
					{!userScoreInTop3 && (
						<>
							<div className="dot-dot-dot">. . .</div>
							<div className="grid-row">
								<div className={`cell5-1 cell`}>{userScore.place}th</div>
								<div className={`cell5-2 cell`}>YOU</div>
								<div className={`cell5-3 cell`}>{userScore.score}</div>
							</div>
						</>
					)}
				</div>
			</div>
			<style jsx>{`
				.leaderboard-container {
					background-color: #ffffff1a;
					border: 1px solid var(--off-white);
					width: 100%;
					height: 100%;
					border-radius: 16px;
					box-shadow: -4px 4px 4;
					color: white;
					font-weight: bold;
					box-sizing: border-box;
					padding: 20px;
					display: flex;
					justify-content: center;
				}

				.grid {
					display: grid;
					grid-template-rows: 5;
					width: 100%;
					max-width: 600px;
					gap: 4px;
				}

				.grid-row {
					display: grid;
					grid-template-columns: 1fr 1fr 1fr;
				}

				.cell {
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.home-description {
					text-align: center;
					color: black;
				}

				.play-btn-div {
					display: flex;
					justify-content: center;
				}

				.play-btn {
					width: 210px;
					height: 40px;
				}

				.cell1-1 {
					color: gold;
				}

				.cell2-1 {
					color: #d1d1d1;
				}

				.cell3-1 {
					color: #977547;
				}

				.cell1-3,
				.cell2-3,
				.cell3-3,
				.cell5-3 {
					color: #ffce1c;
					font-weight: bold;
				}

				.dot-dot-dot {
					font-weight: bold;
					text-align: center;
					font-size: 1.3rem;
				}
			`}</style>
		</>
	);
}
