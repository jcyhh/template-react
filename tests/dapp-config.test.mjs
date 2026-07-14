import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('dapp chain config is driven by env values with safe defaults', () => {
    const source = readFileSync('src/services/dapp/config.ts', 'utf8')

    assert.match(source, /VITE_CHAIN_ID/)
    assert.match(source, /VITE_CHAIN_NAME/)
    assert.match(source, /VITE_CHAIN_NATIVE_SYMBOL/)
    assert.match(source, /VITE_RPC_URL/)
    assert.match(source, /VITE_DAPP_AMOUNT_DECIMALS/)
    assert.match(source, /VITE_MIN_GAS_BALANCE/)
    assert.match(source, /VITE_ENABLE_DAPP_GAS_CHECK/)
    assert.match(source, /VITE_ENABLE_DAPP_GAS_ESTIMATE/)
    assert.match(source, /VITE_ENABLE_ERC20_MAX_APPROVE/)
})

test('dapp reusable constants live in the module config file', () => {
    const configSource = readFileSync('src/services/dapp/config.ts', 'utf8')
    const unitsSource = readFileSync('src/services/dapp/units.ts', 'utf8')

    assert.match(configSource, /DAPP_MAX_AMOUNT_DECIMALS/)
    assert.match(configSource, /DAPP_DEFAULT_AMOUNT_DECIMALS/)
    assert.match(configSource, /DAPP_ERC20_MAX_APPROVE_AMOUNT/)
    assert.doesNotMatch(unitsSource, /const MAX_DAPP_AMOUNT_DECIMALS/)
})
