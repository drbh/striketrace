export interface PanPosition {
	x: number;
	y: number;
}

export interface PanPositionRel extends PanPosition {
	xAbs: number;
	yAbs: number;
}

export interface LegUI {
	strike: number;
	kind: string;
	buySell: string;
	price: number;
	quantity: number;
	lineColor: string;
}

export interface LineData {
	leg: Leg;
}

export interface XDotsData {
	x: number;
	y: number;
	lineColor: string;
}

export type OptionKind = 'CALL' | 'PUT' | 'SUM';
export type BuySell = 'BUY' | 'SELL';
export type LegOrSum = Leg | SumLeg;

export interface Leg {
	kind: OptionKind;
	strike: number;
	buySell: BuySell;
	quantity: number;
	price: number;
	start: number;
	end: number;
}

export interface Point {
	x: number;
	y: number;
	value?: number;
	valueScaled?: number;
}

export interface Intersection extends Point {
	lines: number[];
}

export interface SumLeg extends Leg {
	kind: 'SUM';
	showOnChart: boolean;
	spotlight: boolean;
	lineColor: string;
}
