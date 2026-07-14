import test from 'node:test'
import assert from 'node:assert/strict'
import { AxiosError } from 'axios'

import { httpClient } from '../src/services/http/client.ts'
import { HttpError } from '../src/services/http/error.ts'

function createStorage(token = '') {
    const cache = new Map(token ? [['TOKEN', token]] : [])
    return {
        getItem: (key) => cache.get(key) ?? null,
        setItem: (key, value) => cache.set(key, value),
        removeItem: (key) => cache.delete(key),
    }
}

test('attaches token, language, and JSON content type', async () => {
    const storage = createStorage('token-value')
    storage.setItem('LANG', 'zh-Hant')
    globalThis.window = { localStorage: storage }
    let captured

    await httpClient.request({
        url: '/example',
        method: 'POST',
        data: { value: 1 },
        adapter: async (config) => {
            captured = config
            return { data: {}, status: 200, statusText: 'OK', headers: {}, config }
        },
    })

    assert.equal(captured.headers.get('Authorization'), 'Bearer token-value')
    assert.equal(captured.headers.get('lang'), 'zh-Hant')
    assert.equal(
        captured.headers.getContentType(),
        'application/json; charset=UTF-8',
    )
})

test('normalizes 401 and removes the cached token', async () => {
    const storage = createStorage('expired')
    globalThis.window = { localStorage: storage }

    const request = httpClient.request({
        url: '/private',
        adapter: async (config) => {
            const response = {
                data: { message: '登录已失效' },
                status: 401,
                statusText: 'Unauthorized',
                headers: {},
                config,
            }
            throw new AxiosError(
                'Request failed',
                'ERR_BAD_REQUEST',
                config,
                undefined,
                response,
            )
        },
    })

    await assert.rejects(request, (error) => {
        assert.ok(error instanceof HttpError)
        assert.equal(error.status, 401)
        return true
    })
    assert.equal(storage.getItem('TOKEN'), null)
})
