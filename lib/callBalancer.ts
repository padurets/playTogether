interface Props {
	callsInPeriod: number;
	period?: number;
}

type Callback = () => void;

export const callBalancer = (props: Props) => {
	const { callsInPeriod, period = 1000 } = props;
	let timer: any = null;
	let callCount = 0;
	let queue: Callback[] = [];

	function afterDelay() {
		const queueSnapshot = queue.slice();
		timer = null;
		callCount = 0;
		queue = [];

		queueSnapshot.forEach(caller);
	}

	function delayedСall(callback: Callback) {
		queue.push(callback);

		if (!timer) {
			timer = setTimeout(afterDelay, period);
		}
	}

	function instantCall(callback: Callback) {
		callCount++;
		callback();
	}

	async function caller(callback: Callback) {
		callCount < callsInPeriod ? instantCall(callback) : delayedСall(callback);
	}

	return caller;
};
