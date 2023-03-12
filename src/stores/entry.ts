import { writable } from 'svelte/store';

const createEntry = () => {
	const { subscribe, set, update } = writable('');

	return {
		subscribe,
		set
	};
};
export let obj = writable({});
export const entryValue = createEntry();
