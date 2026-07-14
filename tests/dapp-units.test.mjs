import test from 'node:test'
import assert from 'node:assert/strict'

import {
    DAPP_AMOUNT_DECIMALS,
    formatDappAmountUnits,
    getDappAmountDecimals,
    parseDappAmountUnits,
} from '../src/services/dapp/index.ts'

test('dapp amount decimals default to the common BSC 18-decimal unit', () => {
    assert.equal(DAPP_AMOUNT_DECIMALS, 18)
    assert.equal(getDappAmountDecimals({}), 18)
})

test('dapp amount decimals can be controlled by env for 6-decimal networks', () => {
    assert.equal(getDappAmountDecimals({ VITE_DAPP_AMOUNT_DECIMALS: '6' }), 6)
    assert.equal(getDappAmountDecimals({ VITE_DAPP_AMOUNT_DECIMALS: 'abc' }), 18)
})

test('dapp amount unit conversion uses the configured 18-decimal default', () => {
    assert.equal(formatDappAmountUnits(1_230_000_000_000_000_000n), '1.23')
    assert.equal(parseDappAmountUnits('1.23'), 1_230_000_000_000_000_000n)
})

test('dapp amount unit conversion can use a 6-decimal override', () => {
    assert.equal(formatDappAmountUnits(1_230_000n, { decimals: 6 }), '1.23')
    assert.equal(parseDappAmountUnits('1.23', { decimals: 6 }), 1_230_000n)
})
