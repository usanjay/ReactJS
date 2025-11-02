import { it, expect, describe } from 'vitest';
import { formatMoney } from './money';

describe('formatMoney', () => {
    it('fomat 1999 into $19.99', () => {
        expect(formatMoney(1999)).toBe('$19.99');
    });

    it('dispalys two decimals', () => {
        expect(formatMoney(1200)).toBe('$12.00');
        expect(formatMoney(100)).toBe('$1.00');
        expect(formatMoney(10)).toBe('$0.10');
    });
})
