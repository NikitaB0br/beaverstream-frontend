export function pluralize(
	count: number,
	singular: string,
	few: string,
	plural: string
) {
	if (count % 10 === 1 && count % 100 !== 11) {
		return singular
	} else if (
		count % 10 >= 2 &&
		count % 10 <= 4 &&
		(count % 100 < 10 || count % 100 >= 20)
	) {
		return few
	} else {
		return plural
	}
}
