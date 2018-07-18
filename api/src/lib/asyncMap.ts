export async function asyncMap<R = string, T = string>(
	items: T[],
	cb: (item: T) => Promise<R>
) {
	const mappedItems = [];

	for (let index = 0; index < items.length; index++) {
		let userId = await cb(items[index]);
		mappedItems.push(userId);
	}

	return mappedItems;
}

export default asyncMap;
