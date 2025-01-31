export const samplePOIs = [
	{
		id: 1,
		location: {
			latitude: 51.505,
			longitude: -0.09,
			address: "98 Somewhere StreetStreetStreetStreetStreet",
		},
		type: "event",
		title: "Event McEventface Wow what a great event. A fabulous event.",
		description:
			"Wow what a great event. A fabulous event.Wow what a great event. A fabulous event.Wow what a great event. A fabulous event.Wow what a great event. A fabulous event.Wow what a great event. A fabulous event.Wow what a great event. A fabulous event.Wow what a great event. A fabulous event.Wow what a great event. A fabulous event.Wow what a great event. A fabulous event.Wow what a great event. A fabulous event.Wow what a great event. A fabulous event.Wow what a great event. A fabulous event.Wow what a great event. A fabulous event.Wow what a great event. A fabulous event.Wow what a great event. A fabulous event.Wow what a great event. A fabulous event.",
		startDate: "2024-10-18",
		endDate: null,
		startTime: "9:00 AM",
		endTime: "5:00 PM",
		slug: "event-slug",
	},
	{
		id: 2,
		location: {
			latitude: 52.505,
			longitude: -0.09,
			address: "98 Somewhere Street",
		},
		type: "attraction",
		title: "Attraction McAttractionface",
		description: "Wow what a great attraction. A fabulous attraction.",
		startDate: "2024-10-18",
		endDate: null,
		startTime: "9:00 AM",
		endTime: "5:00 PM",
		slug: "attraction-slug",
	},
	{
		id: 3,
		location: {
			latitude: 51.605,
			longitude: -0.09,
			address: "98 Somewhere Street",
		},
		type: "business",
		title: "Business McBusinessface",
		description: "Wow what a great business. A fabulous business.",
		startDate: "2024-10-18",
		endDate: null,
		startTime: "9:00 AM",
		endTime: "5:00 PM",
		slug: "business-slug",
	},
];

export function formatDate(dateString) {
	const date = new Date(`${dateString}T00:00:00Z`); // Force UTC interpretation
	const options = {
		year: "numeric",
		month: "long",
		day: "numeric",
		timeZone: "UTC",
	};
	const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

	// To add "th" suffix to the day
	const day = date.getUTCDate();
	const daySuffix = ["th", "st", "nd", "rd"][day % 10] || "th";
	const formattedWithSuffix = formattedDate.replace(day, `${day}${daySuffix}`);

	return formattedWithSuffix;
}

export function formatTime(timeString) {
	if (timeString === "00:00:00") return "11:59 PM";
	const timeSeperated = timeString.split(":");
	let hr = parseInt(timeSeperated[0]);
	const min = parseInt(timeSeperated[1]);

	// Determine AM/PM
	const period = hr >= 12 ? "PM" : "AM";

	// Handle 12-hour format
	if (hr === 0) {
		hr = 12; // Convert 00 to 12 for AM
	} else if (hr > 12) {
		hr = hr % 12; // Convert to 12-hour format for PM
	}

	return `${hr >= 10 ? hr : `0${hr}`}:${min >= 10 ? min : `0${min}`} ${period}`;
}

export function formatPhone(phoneString) {
	// Remove all non-digit characters
	const cleaned = phoneString.replace(/\D/g, "");
	return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
}

export const filterByDateRange = (data, rangeStart, rangeEnd) => {
	const startDate = rangeStart || null;
	const endDate = rangeEnd || null;

	return data.filter((item) => {
		if (item.type !== "event") return true;
		const itemStartDate = item.startDate; // Assumes format is 'YYYY-MM-DD'
		const itemEndDate = item.endDate || itemStartDate; // Use startDate if endDate is null

		// No filter applied if both rangeStart and rangeEnd are null
		if (!startDate && !endDate) {
			return true;
		}

		// If endDate is null, filter for items starting from startDate
		if (startDate && !endDate) {
			return itemStartDate >= startDate || itemEndDate >= startDate;
		}

		// If startDate is null, filter for items ending before or on endDate
		if (!startDate && endDate) {
			return itemEndDate <= endDate;
		}

		// If both startDate and endDate are provided, filter within the range
		return (
			(itemStartDate >= startDate && itemStartDate <= endDate) || // Start date within range
			(itemEndDate >= startDate && itemEndDate <= endDate) || // End date within range
			(itemStartDate <= startDate && itemEndDate >= endDate) || // Event spans entire range
			(itemEndDate === itemStartDate &&
				itemStartDate >= startDate &&
				itemStartDate <= endDate) // No end date, event happens on start date
		);
	});
};
