import { EntryKeyHandler } from './EventBuilder';
import { OptionType, TradeType } from './types';
import { describe, it, expect } from 'vitest';

// create a mock keyboard event
class MockKeyboardEvent {
	public target: { value: string };

	constructor(type: string, public key: string, initialVal = '') {
		this.target = {
			value: initialVal + key
		};
	}

	preventDefault() {
		return;
	}
}

describe('entry key handler tests', () => {
	it('handles "C" key', () => {
		const event = new MockKeyboardEvent('keydown', 'C', '');
		// @ts-ignore-next-line
		const handler = new EntryKeyHandler(event);
		const result = handler.handle();
		expect(result.value).toBe('CALL');
		expect(result.parsed.kind).toBe(OptionType.CALL);
	});

	it('handles "P" key', () => {
		const event = new MockKeyboardEvent('keydown', 'P', '');
		// @ts-ignore-next-line
		const handler = new EntryKeyHandler(event);
		const result = handler.handle();
		expect(result.value).toBe('PUT');
		expect(result.parsed.kind).toBe(OptionType.PUT);
	});

	it('handles "B" key', () => {
		const event = new MockKeyboardEvent('keydown', 'B', 'CALL 123 ');
		// @ts-ignore-next-line
		const handler = new EntryKeyHandler(event);
		const result = handler.handle();
		expect(result.value).toBe('CALL 123 BUY');
		expect(result.parsed.kind).toBe(OptionType.CALL);
		expect(result.parsed.strike).toBe('123');
		expect(result.parsed.buySell).toBe(TradeType.BUY);
	});

	it('handles "S" key', () => {
		const event = new MockKeyboardEvent('keydown', 'S', 'CALL 123 ');
		// @ts-ignore-next-line
		const handler = new EntryKeyHandler(event);
		const result = handler.handle();
		expect(result.value).toBe('CALL 123 SELL');
		expect(result.parsed.kind).toBe(OptionType.CALL);
		expect(result.parsed.strike).toBe('123');
		expect(result.parsed.buySell).toBe(TradeType.SELL);
	});

	it('handles adding qty', () => {
		const event = new MockKeyboardEvent('keydown', '1', 'CALL 123 BUY ');
		// @ts-ignore-next-line
		const handler = new EntryKeyHandler(event);
		const result = handler.handle();
		expect(result.value).toBe('CALL 123 BUY 1');
		expect(result.parsed.kind).toBe(OptionType.CALL);
		expect(result.parsed.strike).toBe('123');
		expect(result.parsed.buySell).toBe(TradeType.BUY);
		expect(result.parsed.quantity).toBe('1');
	});
	it('handles adding price twice', () => {
		const event = new MockKeyboardEvent('keydown', '.', 'CALL 123 BUY 1 1');
		// @ts-ignore-next-line
		const handler = new EntryKeyHandler(event);
		const result = handler.handle();
		expect(result.value).toBe('CALL 123 BUY 1 1.');
		expect(result.parsed.kind).toBe(OptionType.CALL);
		expect(result.parsed.strike).toBe('123');
		expect(result.parsed.buySell).toBe(TradeType.BUY);
		expect(result.parsed.quantity).toBe('1');
		expect(result.parsed.price).toBe('1.');

		const _event = new MockKeyboardEvent('keydown', '5', result.value);
		// @ts-ignore-next-line
		const _handler = new EntryKeyHandler(_event);
		const _result = _handler.handle();

		expect(_result.value).toBe('CALL 123 BUY 1 1.5');
		expect(result.parsed.kind).toBe(OptionType.CALL);
		expect(result.parsed.strike).toBe('123');
		expect(result.parsed.buySell).toBe(TradeType.BUY);
		expect(result.parsed.quantity).toBe('1');
		expect(result.parsed.price).toBe('1.5');
	});
});
