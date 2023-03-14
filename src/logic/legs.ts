import type {
	OptionKind,
	BuySell,
	LegOrSum,
	Leg,
	Point,
	Intersection,
	SumLeg
} from '../common/types';


export const valueOfCallAtPrice = (strike: number, current: number): number => {
	return Math.max(0, current - strike);
};
export const valueOfSoldCallAtPrice = (strike: number, current: number): number => {
	return Math.min(0, strike - current);
};

export const valueOfSoldPutAtPrice = (strike: number, current: number): number => {
	return Math.min(0, current - strike );
};

export const valueOfPutAtPrice = (strike: number, current: number): number => {
	return Math.max(0, strike - current);
};

export const getValueAtPrice = (
	strike: number,
	current: number,
	kind: OptionKind,
	buySell: BuySell
): number => {
	if (kind === 'CALL') {
		if (buySell === 'BUY') {
			return valueOfCallAtPrice(strike, current);
		} else if (buySell === 'SELL') {
			return valueOfSoldCallAtPrice(strike, current);
		}
	} else if (kind === 'PUT') {
		if (buySell === 'BUY') {
			return valueOfPutAtPrice(strike, current);
		} else if (buySell === 'SELL') {
			return valueOfSoldPutAtPrice(strike, current);
		}
	}
	return 1; // should never get here
};

export const getLineForLeg = ({
	kind,
	strike,
	buySell,
	quantity,
	price,
	start,
	end
}: Leg): Point[] => {
	const line = [];
	for (let i = start; i < end; i++) {
		const x = i;
		const y = strike;
		const value = getValueAtPrice(strike, x, kind, buySell) + (buySell === 'SELL' ? +price : -price);
		const valueScaled = value * quantity;
		line.push({ x, y: valueScaled, value, valueScaled });
	}
	return line;
};

export const getIntersections = (lines: Point[][]): Intersection[] => {
	const intersections = [];

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		for (let j = 0; j < line.length; j++) {
			const point = line[j];

			const { x, y } = point;
			const intersection = { x, y, lines: [i] };

			intersections.push(intersection);
		}
	}

	return intersections;
};

export function calculateLines(
	legs: LegOrSum[],
	xMin: number,
	xMax: number,
	data: any
): { leg: LegOrSum; line: Point[] }[] {
	const lines = legs
		.filter((leg) => leg.kind !== 'SUM')
		.map((leg) => {
			const line = getLineForLeg({
				...leg,
				start: xMin,
				end: xMax
			});
			return { leg, line };
		});

	if (lines.length > 0) {
		const newLine = lines[lines.length - 1].line;
		data.set(newLine);
	}

	const sumLine = lines[0].line.map((_, i) => ({
		x: lines[0].line[i].x,
		// @ts-ignore-line
		y: lines.reduce((sum, { line }) => sum + line[i].valueScaled, 0)
	}));

	lines.push({
		leg: {
			kind: 'SUM',
			strike: 0,
			buySell: 'BUY',
			quantity: 0,
			price: 0,
			showOnChart: true,
			spotlight: true,
			lineColor: '#FFFFFF22'
		} as SumLeg,
		line: sumLine
	});

	return lines;
}
