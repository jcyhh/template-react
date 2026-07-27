import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

test('project workflow guide records the real project development route', () => {
    const workflow = readFileSync('PROJECT_WORKFLOW.md', 'utf8')
    const readme = readFileSync('README.md', 'utf8')
    const setup = readFileSync('PROJECT_SETUP.md', 'utf8')
    const agentRules = readFileSync('AGENTS.md', 'utf8')

    assert.match(workflow, /AGENTS\.md/)
    assert.match(workflow, /PROJECT_SETUP\.md/)
    assert.match(workflow, /PROJECT_TERMS\.md/)
    assert.match(workflow, /\.env\.example/)
    assert.match(workflow, /pnpm env:init/)
    assert.match(workflow, /pnpm dev/)
    assert.match(workflow, /pnpm test/)
    assert.match(workflow, /pnpm lint/)
    assert.match(workflow, /pnpm build/)
    assert.match(workflow, /AI startup prompt/)
    assert.match(workflow, /Empty project prompt/)
    assert.match(workflow, /https:\/\/github\.com\/jcyhh\/template-react\.git/)
    assert.match(workflow, /当前空项目目录/)
    assert.match(workflow, /Figma page prompt/)
    assert.match(workflow, /Template feedback prompt/)
    assert.match(workflow, /usePageRefresh/)
    assert.match(workflow, /useLatestRequest/)
    assert.match(workflow, /PROJECT_SETUP_STATUS\.md/)

    assert.match(readme, /PROJECT_WORKFLOW\.md/)
    assert.match(setup, /PROJECT_WORKFLOW\.md/)
    assert.match(agentRules, /PROJECT_WORKFLOW\.md/)
})
