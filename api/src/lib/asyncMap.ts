export async function asyncMap<T, R>(items: T[], cb: (item: T) => Promise<R>) {
	return await Promise.all(items.map(async item => await cb(item)));
}

export default asyncMap;
