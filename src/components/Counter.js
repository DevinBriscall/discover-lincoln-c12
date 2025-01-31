import React, { useEffect, useState } from "react";

export default function Counter({ number, className }) {
	const [currentNumber, setCurrentNumber] = useState(0);

	useEffect(() => {
		const digits = String(number).split("").map(Number); // Convert number to array of digits
		const maxDigits = digits.length;

		let currentDigits = Array(maxDigits).fill(0); // Start with all zeros

		// Helper function to calculate the value at a given step
		const calculateValue = (currentDigits) => Number(currentDigits.join(""));

		// Animate counting up
		const interval = setInterval(() => {
			let incremented = false;

			// Increase all tens places by 1
			for (let i = 0; i < maxDigits; i++) {
				if (currentDigits[i] < digits[i]) {
					currentDigits[i]++;
				}
			}

			// Check if we've reached the target number
			incremented = currentDigits.join("") !== digits.join("");

			if (!incremented) {
				clearInterval(interval); // Stop animation once the number matches
			}

			setCurrentNumber(calculateValue(currentDigits)); // Update the current number state
		}, 75);
	}, [number]);

	// Format number with commas
	const formatNumber = (num) => {
		const formattedNumber = num.toLocaleString("en-US");
		const requiredLength = String(number).length - 1;
		return formattedNumber.padStart(
			requiredLength + Math.floor((requiredLength - 1) / 3),
			"0"
		);
	};

	return <div className={className}>{formatNumber(currentNumber)}</div>;
}
