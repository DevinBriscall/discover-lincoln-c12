import React, { useEffect } from "react";
import dynamic from "next/dynamic.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const Map = dynamic(() => import("../components/Map.js"), {
	ssr: false,
});

export default function Filters({ onChange = () => {} }) {
	const position = [51.505, -0.09];
	const [searchValue, setSerachValue] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [tagOnArray, setTagOnArray] = useState([false, false, false]); // tracks if a tag has been selected
	const [tagArray, setTagArray] = useState([]); // tracks which tags have been added to filter for
	const [filterObject, setFilterObject] = useState({
		searchString: "",
		startDate: "",
		endDate: "",
		selected: [],
	});

	useEffect(() => {
		setFilterObject({
			searchString: searchValue,
			startDate: startDate,
			endDate: endDate,
			selected: tagArray,
		});

		onChange({
			searchString: searchValue,
			startDate: startDate,
			endDate: endDate,
			selected: tagArray,
		});

		console.log(filterObject);
	}, [searchValue, startDate, endDate, tagArray]);

	function clearAllFilters() {
		setTagOnArray([false, false, false]);
		setTagArray([]);
		setStartDate("");
		setEndDate("");
		setSerachValue("");
	}

	function handleTagClick(tagId, index) {
		const newArray = [...tagOnArray];
		let newTags = [...tagArray];
		if (newArray[index]) {
			newArray[index] = false;
			newTags = tagArray.filter((element) => element !== tagId);
		} else {
			newArray[index] = true;
			newTags.push(tagId);
		}
		setTagOnArray(newArray);
		setTagArray(newTags);
	}
	return (
		<div className="container">
			<style jsx>
				{`
					.feed-filters {
						display: flex;
						flex-direction: column;
						color: var(--light-grey);
						grid-column: 1/2;
					}

					.search-bar {
						display: flex;
						border: 1px solid var(--light-grey);
						border-radius: 8px;
						align-items: center;
						gap: 0.3rem;
						padding: 4px;
						font-size: 14px;
					}

					.search-bar-label {
						flex: 1;
						display: flex;
					}

					.search-bar-input {
						flex: 1;
					}

					.search-bar-input:focus {
						outline: none;
						color: var(--charcoal);
					}

					.date-container {
						display: flex;
						justify-content: space-between;
						gap: 1rem;
					}

					.date-label {
						border: 1px solid var(--light-grey);
						flex: 1;
						display: flex;
						justify-content: center;
						border-radius: 8px;
						margin-bottom: 8px;
						font-size: 14px;
					}

					.date-input {
						flex: 1;
						padding: 2px;
						border-radius: 8px;
					}

					.tag {
						border: 1px solid var(--light-grey);
						cursor: pointer;
						padding: 0.1rem 1rem;
						border-radius: 8px;
						font-size: 14px;
					}

					.clear-all {
						cursor: pointer;
						font-weight: bold;
						color: blue;
						text-wrap: nowrap;
						font-size: 12px;
					}

					.label {
						font-size: 12px;
					}

					@media screen and (max-width: 485px) {
						.tag-container {
							justify-content: center;
							flex-direction: column;
						}
						.tag {
							font-size: 10px;
						}

						.clear-all {
							font-size: 16px;
						}

						.date-container {
							font-size: 12px;
						}
					}

					.tag-container {
						display: flex;
						justify-content: space-between;
						gap: 0.5rem;
						align-items: center;
					}

					.tags {
						display: flex;
						gap: 0.2rem;
					}
				`}
			</style>
			<div className="feed-filters">
				<div className="search-bar">
					<FontAwesomeIcon icon={faMagnifyingGlass} className="w-3 h-3" />
					<label className="search-bar-label">
						<input
							tabIndex={1}
							className="search-bar-input"
							placeholder="Search..."
							value={searchValue}
							onChange={(event) => setSerachValue(event.target.value)}
						/>
					</label>
				</div>
				<div className="date-container">
					<div style={{ flex: 1 }}>
						<span className="label">Start Date</span>
						<label className="date-label">
							<input
								tabIndex={1}
								type="date"
								value={startDate}
								onChange={(event) => setStartDate(event.target.value)}
								className="date-input"
							/>
						</label>
					</div>

					<div style={{ flex: 1 }}>
						<span className="label">End Date</span>
						<label className="date-label">
							<input
								tabIndex={1}
								type="date"
								value={endDate}
								onChange={(event) => setEndDate(event.target.value)}
								className="date-input"
							/>
						</label>
					</div>
				</div>
				<div className="tag-container">
					<div className="tags">
						<button
							tabIndex={1}
							className="tag"
							id="event"
							onClick={(event) => handleTagClick(event.target.id, 0)}
							style={{
								backgroundColor: tagOnArray[0] ? "var(--red)" : "transparent",
								color: tagOnArray[0] ? "var(--off-white)" : "var(--light-grey)",
							}}
						>
							EVENTS
						</button>
						<button
							tabIndex={1}
							className="tag"
							id="attraction"
							onClick={(event) => handleTagClick(event.target.id, 1)}
							style={{
								backgroundColor: tagOnArray[1]
									? "var(--purple)"
									: "transparent",
								color: tagOnArray[1] ? "var(--off-white)" : "var(--light-grey)",
							}}
						>
							ATTRACTIONS
						</button>
						<button
							tabIndex={1}
							className="tag"
							id="business"
							onClick={(event) => handleTagClick(event.target.id, 2)}
							style={{
								backgroundColor: tagOnArray[2] ? "var(--blue)" : "transparent",
								color: tagOnArray[2] ? "var(--off-white)" : "var(--light-grey)",
							}}
						>
							BUSINESSES
						</button>
					</div>

					<button
						tabIndex={1}
						className="clear-all"
						onClick={() => clearAllFilters()}
					>
						clear all
					</button>
				</div>
			</div>
		</div>
	);
}
