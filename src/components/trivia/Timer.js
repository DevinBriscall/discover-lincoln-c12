import React, { useState, useEffect } from "react";
//
//outOfTime => pass a function for what happens when the timer runs out
//lengthInMS => length of the timer in MS

export default function Timer({
	outOfTime = () => {},
	lengthInMS = 120000,
	onTimeRemainingChanged = () => {},
}) {
	const [timeRemaining, setTimeRemaining] = useState(lengthInMS);

	const UPDATE_SPEED = 20; //how fast the timer animates

	//tell the page how much time is remaining so we can use it to calculate score
	useEffect(() => {
		onTimeRemainingChanged(timeRemaining);
	}, [timeRemaining, onTimeRemainingChanged]);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimeRemaining((prev) => {
				if (prev > UPDATE_SPEED) {
					return prev - UPDATE_SPEED;
				} else {
					clearInterval(UPDATE_SPEED);
					outOfTime();
					return 0;
				}
			});
		}, UPDATE_SPEED);

		return () => clearInterval(interval); // Cleanup interval on component unmount
	}, []);

	const percentageRemaining = (timeRemaining / lengthInMS) * 100;

	return (
		<>
			<div className="timer">
				<div
					className="remainder"
					style={{ width: `${percentageRemaining}%` }}
				></div>
			</div>
			<style jsx>{`
				.timer {
					width: 100%;
					height: 16px;
					background: #ffffff1a;
				}

				.remainder {
					height: 16px;
					background: var(--green);
				}

				.timer,
				.remainder {
					border-radius: 4px;
				}
			`}</style>
		</>
	);
}
