import React from "react";

export default function BAETags({ type }) {
	const tagStyles = {
		attraction: {
			backgroundColor: "var(--purple)",
			textColor: "white",
			label: "Attraction",
		},
		event: {
			backgroundColor: "#D83232",
			textColor: "white",
			label: "Event",
		},
		business: {
			backgroundColor: "#342ED9",
			textColor: "white",
			label: "Business",
		},
	};

	const tag = tagStyles[type] || {};

	return (
		<>
			<div className="tag">{tag.label || "Tag"}</div>

			<style jsx>{`
				.tag {
					min-width: 87px;
					max-width: 87px;
					height: 21px;
					display: flex;
					align-items: center;
					justify-content: center;
					text-align: center;
					font-size: 0.875rem;
					border-radius: 4px;
					font-weight: bold;
					background-color: ${tag.backgroundColor || "#ccc"};
					color: ${tag.textColor || "black"};
				}

				@media screen and (max-width: 426px) {
					.tag {
						font-size: 0.7rem;
					}
				}
			`}</style>
		</>
	);
}
