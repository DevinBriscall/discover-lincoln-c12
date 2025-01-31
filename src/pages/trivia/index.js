import React, { useEffect, useRef, useState } from "react";
import { questionPool } from "@/utils/triviaUtils";
import Image from "next/image";
import toast from "react-hot-toast";
import Timer from "@/components/trivia/Timer";
import Leaderboard from "@/components/trivia/Leaderboard";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function Index() {
	const [allQuestions, setAllQuestions] = useState();
	const [questions, setQuestions] = useState(questionPool);
	const [gameState, setGameState] = useState(null); //null, playing, guessed, finished
	const [alias, setAlias] = useState(null);
	const [selectedResponse, setSelectedResponse] = useState(null);
	const [round, setRound] = useState(1);
	const [roundScore, setRoundScore] = useState(0);
	const [totalScore, setTotalScore] = useState(0);
	const TIME_TO_ANSWER_IN_MS = 10000;
	const [timeRemaining, setTimeRemaining] = useState(0);
	const [rank, setRank] = useState(null); //where the user score sits in the leaderboard

	//refs
	const aliasRef = useRef();

	useEffect(() => {
		//get the questions from strapi
		async function getStrapiQuestions() {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/trivia-questions?populate=*`
				);

				if (!response.ok) {
					setAllQuestions(questionPool);
					setQuestions(getRandomEntries(questionPool, 5));
				}

				const data = await response.json();
				setAllQuestions(data.data);
				setQuestions(getRandomEntries(data.data, 5));
			} catch (error) {
				setAllQuestions(questionPool);
				setQuestions(getRandomEntries(questionPool, 5));
			}
		}

		getStrapiQuestions();
	}, []);

	function getRandomEntries(arr, num) {
		const shuffled = arr.sort(() => 0.5 - Math.random());
		return shuffled.slice(0, num).map((location) => location);
	}

	async function handleEndGame() {
		setGameState("finished");
		setSelectedResponse(null);
		//create the score entry
		async function saveScore() {
			//create the new score entry
			const newScore = await fetch(
				`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/trivia-scores`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						data: {
							alias: alias,
							score: totalScore,
						},
					}),
				}
			)
				.then((response) => response.json())
				.then((data) => data.data); // Save the newly added score data

			//get all the scores
			const allScores = await fetch(
				`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/trivia-scores?sort=score:desc&pagination[pageSize]=1000`
			)
				.then((response) => response.json())
				.then((data) => data.data);

			//determine the rank
			const newScoreId = newScore.id;
			let rank = -1;

			for (let i = 0; i < allScores.length; i++) {
				if (allScores[i].id === newScoreId) {
					rank = i + 1;
					break;
				}
			}

			setRank(rank);
		}

		await saveScore();
	}

	return (
		<>
			<Head>
				<title>Discover Lincoln - Trivia</title>
			</Head>
			<div className="background">
				<div className="game-area shadow">
					{/* grape */}
					<div className="grape-accent">
						<Image src={"/images/grapes.svg"} fill alt="grape" />
					</div>

					{/* header */}
					<div className="header">
						{gameState === null && "WELCOME TO LINCOLN TRIVIA"}
						{gameState === "playing" && `ROUND ${round} / 5`}
						{gameState === "guessed" && selectedResponse.correct && "CORRECT"}
						{gameState === "guessed" &&
							!selectedResponse.correct &&
							selectedResponse.response &&
							"WRONG"}
						{gameState === "guessed" &&
							!selectedResponse.correct &&
							!selectedResponse.response &&
							"OUT OF TIME"}
						{gameState === "finished" && "RESULTS"}
					</div>

					{/* sub-header */}
					{gameState != "finished" && gameState != null && (
						<span className="sub-header">
							{gameState === "playing" &&
								questions.length &&
								questions[round - 1].Question}
							{gameState === "guessed" && `YOU EARNED ${roundScore} POINTS`}
						</span>
					)}

					{/* GAMESTATE NULL */}
					{/* alias entry */}
					{gameState === null && (
						<>
							<div className="grid gap-4">
								<span className="sub-header">PLEASE ENTER YOUR NAME</span>
								<input ref={aliasRef} type="text" className="alias shadow" />
							</div>
							<button
								className="action-button shadow"
								type="button"
								onClick={() => {
									const chosenAlias = aliasRef.current.value;
									if (!chosenAlias) {
										toast.error("Please enter an alias.");
										aliasRef.current.focus();
									} else {
										setAlias(chosenAlias);
										setGameState("playing");
									}
								}}
							>
								PLAY
							</button>
						</>
					)}

					{/* GAMESTATE PLAYING */}
					{gameState === "playing" && (
						<>
							{/* responses */}
							<div className="response-container">
								{questions[round - 1].answers.map((response, i) => (
									<button
										className="response shadow"
										key={i}
										onClick={() => {
											setSelectedResponse(response);
											setGameState("guessed");
											const score = response.correct
												? Math.ceil(
														5000 * (timeRemaining / TIME_TO_ANSWER_IN_MS)
												  )
												: 0;
											setRoundScore(score);
											setTotalScore(totalScore + score);
										}}
									>
										{response.response}
									</button>
								))}
							</div>
							<div>
								<Timer
									lengthInMS={TIME_TO_ANSWER_IN_MS}
									outOfTime={() => {
										return;
										setSelectedResponse({ response: null, correct: false });
										setGameState("guessed");
										setRoundScore(0);
									}}
									onTimeRemainingChanged={(time) => setTimeRemaining(time)}
								/>
							</div>
						</>
					)}

					{/* GAMESTATE GUESSED */}
					{gameState === "guessed" && (
						<>
							<span className="total-score">{totalScore}</span>
							<button
								className="action-button shadow"
								onClick={() => {
									if (round < 5) {
										setGameState("playing");
										setRound(round + 1);
									} else {
										handleEndGame();
									}
								}}
							>
								{round < 5 ? "NEXT ROUND" : "FINISH"}
							</button>
						</>
					)}

					{/* GAMESTATE FINISHED */}
					{gameState == "finished" && (
						<>
							<div className="leaderboard-container">
								<Leaderboard
									userScore={{ alias: alias, score: totalScore, place: rank }}
								/>
							</div>
							<button
								className="action-button shadow"
								onClick={() => {
									setQuestions(getRandomEntries(allQuestions, 5));
									setRound(1);
									setGameState("playing");
									setTotalScore(0);
									setRank(null);
								}}
							>
								PLAY AGAIN
							</button>
						</>
					)}
				</div>
			</div>

			<style jsx>{`
				.background {
					min-height: calc(100vh - 76px);
					width: 100%;
					background-size: cover;
					background-position: center;
					background-image: linear-gradient(
							rgba(0, 0, 0, 0.4),
							rgba(0, 0, 0, 0.4)
						),
						url("/images/trivia_background.jpg");
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.game-area {
					max-width: 800px;
					width: 98vw;
					min-height: 50vh;
					min-height: 400px;
					height: fit-content;
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

				.grape-accent {
					width: 40px;
					height: 40px;
					position: absolute;
					top: 0;
					right: 24px;
					filter: brightness(0) saturate(100%) invert(96%) sepia(27%)
						saturate(153%) hue-rotate(180deg) brightness(100%) contrast(97%);
				}

				.header {
					color: var(--off-white);
					font-size: 2rem;
					font-weight: bold;
				}

				.sub-header {
					color: var(--off-white);
					font-size: 1.5rem;
					font-weight: bold;
				}

				.alias {
					border-radius: 8px;
					background: #ffffff00;
					width: 100%;
					max-width: 500px;
					justify-self: center;
					color: white;
					padding: 4px;
					font-size: 1.5rem;
					font-weight: bold;
					text-transform: uppercase;
					border: 1px solid white;
				}

				.action-button {
					background: var(--green);
					padding: 12px 48px;
					color: white;
					font-weight: bold;
					width: fit-content;
					height: fit-content;
					border-radius: 4px;
					margin-left: auto;
					margin-right: auto;
				}

				.response-container {
					display: flex;
					flex-grow: 1;
					gap: 16px;
					align-items: stretch;
					padding: 8px 16px;
					height: 100%;
					width: 100%;
				}

				.response {
					display: flex;
					color: var(--off-white);
					font-weight: bold;
					font-size: 24px;
					justify-content: center;
					align-items: center;
					background: #ffffff1a;
					width: 100%;
					max-height: 200px;
					border-radius: 8px;
					border: 2px solid var(--off-white);
					transition: all 0.3s ease;
				}

				.response:hover {
					cursor: pointer;
					scale: 105%;
				}

				.total-score {
					color: var(--off-white);
					font-weight: bold;
					font-size: 100px;
				}

				.leaderboard-container {
					width: 100%;
				}

				@media (max-width: 768px) {
					.response-container {
						flex-direction: column;
					}

					.response {
						min-height: 100px;
					}

					.total-score {
						font-size: 40px;
					}
				}
			`}</style>
		</>
	);
}
