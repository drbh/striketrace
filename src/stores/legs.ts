import { writable } from 'svelte/store';
import { calculateLines, getValueAtPrice } from '../logic/legs';

export const xKey = 'x';
export const yKey = 'y';
export let xDots = writable([]);
export let allLineData = writable([]);
export let data = writable([]);
export let legs = writable([
	{
		kind: 'PUT',
		strike: 40,
		buySell: 'BUY',
		quantity: 5,
		price: 10.88,
		//
		showOnChart: true,
		spotlight: false,
		lineColor: '#6E00FF'
	},
	{
		kind: 'PUT',
		strike: 35,
		buySell: 'SELL',
		quantity: 10,
		price: 6.16,
		//
		showOnChart: true,
		spotlight: false,
		lineColor: '#5BFF00'
	},
	{
		kind: 'PUT',
		strike: 30,
		buySell: 'BUY',
		quantity: 5,
		price: 2.84,
		//
		showOnChart: true,
		spotlight: false,
		lineColor: '#00FFD4'
	}
]);

export let panEndPos = { x: 0, y: 0 };
export let panEndPosRel = writable({ x: 0, y: 0 });
export let xMin = writable(20);
export let xMax = writable(50);
export let yMin = writable(-50);
export let yMax = writable(60);
export let svgPanZoomInstance;
export let showStats = writable(true);

const handleClick = () => {
	console.log('handleClick');
	const innerElement = svgElement.getRootNode();
	console.log('innerElement', innerElement);
};

// subscribe to multiple stores (legs, xMin, xMax)
// and calculate lines
legs.subscribe((legs) => {
	xMin.update((xMin) => {
		xMax.update((xMax) => {
			const lines = calculateLines(legs, xMin, xMax, data);
			allLineData.set(lines);
			return xMax;
		});
		return xMin;
	});
});

export const handleOnChangeShowOnChart = (showOnChart, leg) => {
	legs.update((legs) => {
		return legs.map((l) => {
			if (l === leg) {
				return {
					...l,
					showOnChart
				};
			}
			return l;
		});
	});
};

export const handleOnChangeShowZeroIntersection = (showZeroIntersection, leg) => {
	legs.update((legs) => {
		return legs.map((l) => {
			if (l === leg) {
				return {
					...l,
					showZeroIntersection
				};
			}
			return l;
		});
	});
};

export const handleOnChageSpotlight = (spotlight, leg) => {
	legs.update((legs) => {
		return legs.map((l) => {
			if (l === leg) {
				return {
					...l,
					showOnChart: true,
					spotlight
				};
			}
			return {
				...l,
				spotlight: false
			};
		});
	});
};

export const handleOnRemoveLegAtIndex = (legIndex) => {
	legs.update((legs) => {
		return legs.filter((l, i) => i !== legIndex);
	});
};

export const handleOnAddLeg = (obj: any) => {
	legs.update((legs) => {
		let result;
		obj.update((object) => {
			result = [
				...legs,
				{
					kind: object.kind,
					strike: parseFloat(object.strike),
					buySell: object.buySell,
					quantity: parseFloat(object.quantity),
					price: parseFloat(object.price),
					showOnChart: true,
					spotlight: false,
					lineColor: '#FFFFFF'
				}
			];
			return obj;
		});
		return result;
	});
};

export const fitMainAreaIntoView = () => {
	// use the max y value of the last line to determine a good center x value
	let maxY = 0;
	$allLineData.forEach((lineData) => {
		lineData.forEach((lineData) => {
			if (lineData.y > maxY) {
				maxY = lineData.y;
			}
		});
	});
};
