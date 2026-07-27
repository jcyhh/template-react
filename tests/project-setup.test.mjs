import test from 'node:test'
import assert from 'node:assert/strict'
import {
    existsSync,
    readdirSync,
    readFileSync,
    statSync,
} from 'node:fs'
import { join } from 'node:path'

function collectSourceFiles(directory) {
    return readdirSync(directory).flatMap((name) => {
        const file = join(directory, name)
        const stat = statSync(file)

        if (stat.isDirectory()) {
            return collectSourceFiles(file)
        }

        if (!/\.(ts|tsx|json|scss|md)$/.test(file)) {
            return []
        }

        return [file]
    })
}

test('new project setup guide records template bootstrapping decisions', () => {
    const setup = readFileSync('PROJECT_SETUP.md', 'utf8')
    const readme = readFileSync('README.md', 'utf8')
    const agentRules = readFileSync('AGENTS.md', 'utf8')

    assert.match(setup, /\.env\.example/)
    assert.match(setup, /\.env\.development/)
    assert.match(setup, /\.env\.production/)
    assert.match(setup, /VITE_BASE_URL/)
    assert.match(setup, /VITE_RPC_URL/)
    assert.match(setup, /public\/brand\/app-logo\.png/)
    assert.match(setup, /Figma/)
    assert.match(setup, /PROJECT_TERMS\.md/)

    assert.match(readme, /PROJECT_SETUP\.md/)
    assert.match(readme, /PROJECT_TERMS\.md/)
    assert.match(agentRules, /PROJECT_SETUP\.md/)
    assert.match(agentRules, /PROJECT_TERMS\.md/)
})

test('project terminology bans wrong user-facing words from source code', () => {
    const terms = readFileSync('PROJECT_TERMS.md', 'utf8')
    const agentRules = readFileSync('AGENTS.md', 'utf8')
    const files = collectSourceFiles('src')
    const sourceWithBannedTerm = files.filter((file) => (
        !file.includes('/vendor/')
        && readFileSync(file, 'utf8').includes('提现')
    ))

    assert.match(terms, /提现/)
    assert.match(terms, /提取/)
    assert.match(agentRules, /不要使用 `提现`/)
    assert.deepEqual(sourceWithBannedTerm, [])
})

test('template provides a single public brand logo for project replacement', () => {
    assert.equal(existsSync('public/brand/app-logo.png'), true)
})
