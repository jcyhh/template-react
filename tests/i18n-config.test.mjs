import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

import {
    APP_LANGUAGES,
    DEFAULT_LANGUAGE_CODE,
    findAppLanguage,
} from '../src/i18n/config.ts'
import { getRequestLanguage } from '../src/i18n/getRequestLanguage.ts'

function createStorage(language = '') {
    const cache = new Map(language ? [['LANG', language]] : [])
    return {
        getItem: (key) => cache.get(key) ?? null,
        setItem: (key, value) => cache.set(key, value),
        removeItem: (key) => cache.delete(key),
    }
}

test('enables all template languages with standard language codes', () => {
    assert.deepEqual(
        APP_LANGUAGES.map(({ code }) => code),
        [
            'en', 'fr', 'ko', 'ja', 'ru', 'hi', 'ms',
            'es', 'id', 'tr', 'vi', 'th', 'zh-Hant', 'zh-Hans',
        ],
    )
    assert.equal(DEFAULT_LANGUAGE_CODE, 'zh-Hans')
    assert.equal(findAppLanguage('zh-Hans')?.code, 'zh-Hans')
    assert.equal(findAppLanguage('unsupported'), undefined)
})

test('returns the configured backend language and safely falls back', () => {
    globalThis.window = { localStorage: createStorage('ms') }
    assert.equal(getRequestLanguage(), 'ms')

    globalThis.window = { localStorage: createStorage('unsupported') }
    assert.equal(getRequestLanguage(), 'zh-Hans')
})

test('i18n initializes and changes the app store language from storage', async () => {
    const [changeSource, initializeSource, storeSource] = await Promise.all([
        readFile('src/i18n/changeAppLanguage.ts', 'utf8'),
        readFile('src/i18n/initializeI18n.ts', 'utf8'),
        readFile('src/stores/app/store.ts', 'utf8'),
    ])

    assert.match(storeSource, /languageCode/)
    assert.match(storeSource, /getLanguage\(\)/)
    assert.match(changeSource, /useAppStore/)
    assert.match(changeSource, /setLanguageCode\(language\.code\)/)
    assert.match(initializeSource, /useAppStore/)
    assert.match(initializeSource, /setLanguageCode\(selectedLanguage\.code\)/)
})
