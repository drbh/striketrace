import { OptionType, TradeType } from './types';
import type { EntryValue } from './types';

export class EntryValueBuilder {
	private value: EntryValue = {};

	setOptionType(optionType: OptionType) {
		this.value.kind = optionType;
		return this;
	}

	setStrike(strike: string) {
		this.value.strike = strike;
		return this;
	}

	setTradeType(tradeType: TradeType) {
		this.value.buySell = tradeType;
		return this;
	}

	setQuantity(quantity: string) {
		this.value.quantity = quantity;
		return this;
	}

	setPrice(price: string) {
		this.value.price = price;
		return this;
	}

	build() {
		return this.value;
	}
}

export class EntryKeyHandler {
	private entryValueBuilder: EntryValueBuilder;

	constructor(private readonly event: KeyboardEvent) {
		this.entryValueBuilder = new EntryValueBuilder();
	}

	handle() {
		const { key, target } = this.event;
		const current = (target! as any).value;
		const incoming = key.toUpperCase();

		let value = current;

		if (incoming === 'C') {
			value = 'CALL';
		} else if (incoming === 'P') {
			value = 'PUT';
		}

		if (current.split(' ').length === 3) {
			if (incoming == 'B') {
				value = current.replace(/\w+$/, 'BUY');
			}
			if (incoming == 'S') {
				value = current.replace(/\w+$/, 'SELL');
			}
		}

		// pase the value into the builder
		const words = value.split(' ');

		const [kind, strike, buySell, quantity, price] = words;

		if (kind) {
			this.entryValueBuilder.setOptionType(kind as OptionType);
		}
		if (strike) {
			this.entryValueBuilder.setStrike(strike);
		}
		if (buySell) {
			this.entryValueBuilder.setTradeType(buySell as TradeType);
		}
		if (quantity) {
			this.entryValueBuilder.setQuantity(quantity);
		}
		if (price) {
			this.entryValueBuilder.setPrice(price);
		}

		const parsed = this.entryValueBuilder.build();

		// @ts-ignore-next-line
		(this.event as any).preventDefault();

		return {
			value,
			parsed
		};
	}
}
