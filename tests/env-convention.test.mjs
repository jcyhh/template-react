import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const realEnvFiles = ['.env.development', '.env.production']
const envVariableNames = [
    'VITE_BASE_URL',
    'VITE_RPC_URL',
    'VITE_CHAIN_ID',
    'VITE_CHAIN_NAME',
    'VITE_CHAIN_NATIVE_NAME',
    'VITE_CHAIN_NATIVE_SYMBOL',
    'VITE_CHAIN_NATIVE_DECIMALS',
    'VITE_CHAIN_EXPLORER_URL',
    'VITE_MIN_GAS_BALANCE',
    'VITE_ENABLE_DAPP_GAS_CHECK',
    'VITE_ENABLE_DAPP_GAS_ESTIMATE',
    'VITE_ENABLE_ERC20_MAX_APPROVE',
    'VITE_DAPP_AMOUNT_DECIMALS',
    'VITE_USDT',
    'VITE_APP_NAME',
    'VITE_ENABLE_SOCIAL_META',
    'VITE_SOCIAL_TITLE',
    'VITE_SOCIAL_DESCRIPTION',
    'VITE_SOCIAL_URL',
    'VITE_SOCIAL_IMAGE',
    'VITE_SOCIAL_IMAGE_WIDTH',
    'VITE_SOCIAL_IMAGE_HEIGHT',
    'VITE_SOCIAL_IMAGE_ALT',
    'VITE_SOCIAL_LOCALE',
    'VITE_SOCIAL_X_SITE',
    'VITE_SOCIAL_X_CREATOR',
]

function getRuntimeLines(content) {
    return content
        .split(/\r?\n/)
        .map((line) => line.trimEnd())
        .filter((line) => line && !line.startsWith('#'))
}

function getEnvVariableNames(content) {
    return getRuntimeLines(content).map((line) => {
        const match = /^([A-Z][A-Z0-9_]*) =(?: .*)?$/.exec(line)

        return match?.[1] ?? line
    })
}

function assertEnvAssignmentStyle(content) {
    for (const line of getRuntimeLines(content)) {
        assert.match(line, /^[A-Z][A-Z0-9_]* =(?: .*)?$/)
        assert.doesNotMatch(line, /^[A-Z][A-Z0-9_]*=/)
    }
}

test('example env documents every public variable', async () => {
    const content = await readFile(new URL('../.env.example', import.meta.url), 'utf8')

    assert.deepEqual(getEnvVariableNames(content), envVariableNames)
    assert.match(content, /# Runtime endpoints and shared project values\./)
    assert.match(content, /# 运行时接口地址和项目通用值。/)
    assert.match(content, /# Whether to inject social sharing meta tags into index\.html\./)
    assert.match(content, /# 是否向 index\.html 注入社交分享 meta 标签。/)
    assertEnvAssignmentStyle(content)
})

test('real env files keep only runtime values without comments', async () => {
    const contents = await Promise.all(
        realEnvFiles.map((file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8')),
    )

    for (const content of contents) {
        assert.deepEqual(getEnvVariableNames(content), envVariableNames)
        assert.doesNotMatch(content, /^#/m)
        assertEnvAssignmentStyle(content)
    }
})

test('only real environment files are ignored', async () => {
    const gitignore = await readFile(new URL('../.gitignore', import.meta.url), 'utf8')
    const rules = new Set(
        gitignore
            .split(/\r?\n/)
            .map((line) => line.trim())
            .filter((line) => line && !line.startsWith('#')),
    )

    assert.equal(rules.has('.env.development'), true)
    assert.equal(rules.has('.env.production'), true)
    assert.equal(rules.has('.env.example'), false)
})
