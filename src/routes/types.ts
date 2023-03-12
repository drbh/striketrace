export enum OptionType {
	CALL = 'CALL',
	PUT = 'PUT'
}
export enum TradeType {
	BUY = 'BUY',
	SELL = 'SELL'
}
export type EntryValue = {
	kind?: OptionType;
	strike?: string;
	buySell?: TradeType;
	quantity?: string;
	price?: string;
};
