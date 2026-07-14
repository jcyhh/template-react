import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

import {
    shouldCheckDappGas,
    shouldEstimateDappGas,
} from '../src/services/dapp/config.ts'

test('dapp gas check is controlled by a string env switch', () => {
    assert.equal(shouldCheckDappGas({ VITE_ENABLE_DAPP_GAS_CHECK: '1' }), true)
    assert.equal(shouldCheckDappGas({ VITE_ENABLE_DAPP_GAS_CHECK: '0' }), false)
    assert.equal(shouldCheckDappGas({}), true)
})

test('dapp gas estimation is controlled by env but always disabled in development', () => {
    assert.equal(shouldEstimateDappGas({ VITE_ENABLE_DAPP_GAS_ESTIMATE: '1' }, true), true)
    assert.equal(shouldEstimateDappGas({ VITE_ENABLE_DAPP_GAS_ESTIMATE: '0' }, true), false)
    assert.equal(shouldEstimateDappGas({}, true), true)
    assert.equal(shouldEstimateDappGas({ VITE_ENABLE_DAPP_GAS_ESTIMATE: '1' }, false), false)
})

test('contract writes run the shared gas check before sending transactions', () => {
    const source = readFileSync('src/services/dapp/contract.ts', 'utf8')

    assert.match(source, /await checkDappGasBalance\(\)/)
})

test('contract gas submission only runs through the shared gas estimation switch', () => {
    const source = readFileSync('src/services/dapp/contract.ts', 'utf8')

    assert.match(source, /shouldEstimateDappGas\(\)/)
    assert.doesNotMatch(source, /import\.meta\.env\?\.PROD/)
})
