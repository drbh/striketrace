export const handleEntryKey = ({ obj, entryValue, event }: any) => {
	console.log('event', event);
	const current = event.target.value;
	const words = event.target.value.split(' ');
	const incoming = event.key.toUpperCase();

	let newEntryValue;

	if (incoming === 'C') {
		newEntryValue = 'CALL';
	}
	if (incoming === 'P') {
		newEntryValue = 'PUT';
	}

	if (words.length === 3 && incoming === 'B') {
		newEntryValue = `${words[0]} ${words[1]} ${'BUY'}`;
	}
	if (words.length === 3 && incoming === 'S') {
		newEntryValue = `${words[0]} ${words[1]} ${'SELL'}`;
	}

	if (incoming === ' ') {
		newEntryValue = `${current} `;
	}

	if (!isNaN(incoming) || incoming === '.') {
		newEntryValue = `${current}${incoming}`;
	}

	let newValue;

	if (words.length >= 1 && words.length <= 5 && !isNaN(incoming)) {
		const final = words[words.length - 1] + incoming;
		words[words.length - 1] = final;

		const [kind, strike, buySell, quantity, price] = words.slice(0, words.length);

		newValue = {
			kind,
			...(strike && { strike }),
			...(buySell && { buySell }),
			...(quantity && { quantity }),
			...(price && { price })
		};
	}
    
	if (newEntryValue) {
		entryValue.set(newEntryValue);
	}

	if (newValue && Object.keys(newValue).length > 0) {
		obj.set(newValue);
	}

	event.preventDefault();
};
