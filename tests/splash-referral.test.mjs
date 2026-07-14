import test from 'node:test'
import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'

import { getReferralCode, removeReferralCode } from '../src/services/storage/index.ts'
import { saveSplashReferralCode } from '../src/pages/splash/referral.ts'

function createStorage() {
    const cache = new Map()
    return {
        cache,
        getItem: (key) => cache.get(key) ?? null,
        setItem: (key, value) => cache.set(key, value),
        removeItem: (key) => cache.delete(key),
    }
}

test('splash page stores referral code from the route param', () => {
    globalThis.window = { localStorage: createStorage() }
    removeReferralCode()

    assert.equal(saveSplashReferralCode(' abc123 '), true)
    assert.equal(getReferralCode(), 'abc123')
})

test('splash page ignores empty referral code values', () => {
    globalThis.window = { localStorage: createStorage() }
    removeReferralCode()

    assert.equal(saveSplashReferralCode('   '), false)
    assert.equal(saveSplashReferralCode(undefined), false)
    assert.equal(getReferralCode(), '')
})

test('splash route reuses the same page and clears referral URL after caching', async () => {
    const source = await readFile(
        new URL('../src/pages/splash/SplashPage.tsx', import.meta.url),
        'utf8',
    )

    assert.match(source, /useParams/)
    assert.match(source, /saveSplashReferralCode\(ref\)/)
    assert.match(source, /navigate\(ROUTE_PATH\.root,\s*\{\s*replace:\s*true\s*\}\)/)
})

test('splash page keeps the old logo, tips, loading and animation content', async () => {
    const source = await readFile(
        new URL('../src/pages/splash/SplashPage.tsx', import.meta.url),
        'utf8',
    )

    assert.match(source, /assets\/start\/splash-logo\.png/)
    assert.match(source, /Welcome to X SmartPay/)
    assert.match(source, /splash-page__loading/)
    assert.match(source, /animate__zoomIn/)
    assert.match(source, /animate__slideInUp/)
})

test('splash page copies only the old logo asset without the old background', async () => {
    await assert.doesNotReject(() => access('src/assets/start/splash-logo.png'))
    await assert.rejects(() => access('src/assets/start/logo.png'))
    await assert.rejects(() => access('src/assets/start/1.png'))
})

test('splash page style follows the old opening page layout without background image', async () => {
    const source = await readFile(
        new URL('../src/pages/splash/SplashPage.scss', import.meta.url),
        'utf8',
    )

    assert.match(source, /width:\s*224px/)
    assert.match(source, /height:\s*211px/)
    assert.match(source, /bottom:\s*953px/)
    assert.match(source, /bottom:\s*30px/)
    assert.doesNotMatch(source, /background-image/)
})
