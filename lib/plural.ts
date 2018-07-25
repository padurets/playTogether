export type PluralVariants<T> = [T, T, T];

/**
 * Вывод множественного кириллического числа для заданных вариантов
 *
 * @param value числовое значение
 * @param variants список из трёх вариантов
 */

export const plural = <T>(value: number, variants: PluralVariants<T>): T => {
	const [one, two, five] = variants;
	let num = Math.abs(value);

	num %= 100;
	if (num >= 5 && num <= 20) {
		return five;
	}

	num %= 10;
	if (num === 1) {
		return one;
	} else if (num >= 2 && num <= 4) {
		return two;
	} else {
		return five;
	}
};

export default plural;
