import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

function assertMatchesInOrder(content, patterns) {
    let cursor = -1

    for (const pattern of patterns) {
        const match = content.slice(cursor + 1).match(pattern)

        assert.notEqual(match?.index, undefined, `Missing ordered pattern: ${pattern}`)

        cursor += match.index + 1
    }
}

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
    assert.match(workflow, /next-step guidance/)
    assert.match(workflow, /下一步引导/)
    assert.match(workflow, /completion summary/)
    assert.match(workflow, /完成总结/)
    assert.match(workflow, /automatic theme color extraction/i)
    assert.match(workflow, /页面实现时自动抽取公共颜色/)
    assert.match(workflow, /主题 SCSS 配置/)
    assert.match(workflow, /src\/styles\/color\.scss/)
    assert.match(workflow, /developer does not need to confirm theme colors/i)
    assert.match(workflow, /开发者不需要[\s\S]*确认[\s\S]*颜色/)
    assert.match(workflow, /only ask[\s\S]*project-wide theme direction/i)
    assert.match(workflow, /只有[\s\S]*全项目主题方向/)
    assert.match(workflow, /first designed page/)
    assert.match(workflow, /第一个设计页面/)
    assert.doesNotMatch(workflow, /theme token pack[\s\S]{0,240}ask for one confirmation/i)
    assert.doesNotMatch(workflow, /主题 token 包[\s\S]{0,240}一次确认/)
    assert.match(workflow, /Figma page/)
    assert.match(workflow, /API integration/)
    assert.match(workflow, /DApp and contract/)
    assert.match(workflow, /showcase/)

    assert.match(readme, /PROJECT_WORKFLOW\.md/)
    assert.match(setup, /PROJECT_WORKFLOW\.md/)
    assert.match(agentRules, /PROJECT_WORKFLOW\.md/)
    assert.match(setup, /下一步引导/)
    assert.match(agentRules, /下一步引导/)
    assert.match(setup, /主题 SCSS 配置/)
    assert.match(agentRules, /主题 SCSS 配置/)
    assert.match(setup, /页面实现时自动抽取公共颜色/)
    assert.match(agentRules, /页面实现时自动抽取公共颜色/)
})

test('empty project startup flow runs the dev server before the first setup question', () => {
    const workflow = readFileSync('PROJECT_WORKFLOW.md', 'utf8')
    const setup = readFileSync('PROJECT_SETUP.md', 'utf8')
    const agentRules = readFileSync('AGENTS.md', 'utf8')

    assert.match(workflow, /template is copied/)
    assert.match(workflow, /pnpm install/)
    assert.match(workflow, /pnpm env:init/)
    assert.match(workflow, /pnpm dev/)
    assert.match(workflow, /Local/)
    assert.match(workflow, /Network/)
    assert.match(workflow, /局域网/)
    assert.match(workflow, /first setup question/)
    assert.match(workflow, /第一个初始化问题/)
    assert.match(workflow, /default setup pack/)
    assert.match(workflow, /默认配置包/)
    assert.match(workflow, /reply `默认`/)
    assert.match(workflow, /回复 `默认`/)
    assert.match(workflow, /菜单 tabbar/)
    assert.match(workflow, /多语言关闭/)
    assert.match(workflow, /可选项/)
    assert.match(workflow, /sidebar/)
    assert.match(workflow, /tabbar/)
    assert.match(workflow, /dapp/)
    assert.match(workflow, /hybrid/)
    assert.match(workflow, /account/)
    assert.match(workflow, /other viem chain/)
    assert.match(workflow, /development[\s\S]*zh-Hans/)
    assert.match(workflow, /production[\s\S]*en/)
    assert.match(workflow, /gas check disabled/)
    assert.match(workflow, /gas estimate disabled/)
    assert.match(workflow, /specific amount/)
    assert.match(workflow, /other decimals/)
    assert.match(setup, /first setup question/)
    assert.match(setup, /局域网/)
    assert.match(agentRules, /first setup question/)
    assert.match(agentRules, /局域网/)
})

test('post-setup development workflow is sequential with skippable contract preparation', () => {
    const workflow = readFileSync('PROJECT_WORKFLOW.md', 'utf8')
    const setup = readFileSync('PROJECT_SETUP.md', 'utf8')
    const agentRules = readFileSync('AGENTS.md', 'utf8')

    assertMatchesInOrder(workflow, [
        /static pages/i,
        /API documentation/i,
        /Contract documentation/i,
        /Feature logic integration/i,
        /Pre-build preparation/i,
    ])

    assert.match(workflow, /fixed post-setup development sequence/i)
    assert.match(workflow, /Do not enter the next step until the current step is complete/i)
    assert.match(workflow, /Step 3 is the only skippable step/i)
    assert.match(workflow, /If API documentation is ready before contract documentation/i)
    assert.match(workflow, /record the skipped contract step in `PROJECT_SETUP_STATUS\.md`/)
    assert.match(workflow, /continue to Step 4/)
    assert.match(workflow, /VITE_BASE_URL/)
    assert.match(workflow, /VITE_RPC_URL/)
    assert.match(workflow, /animate\.css/)
    assert.match(workflow, /translate all static page copy/i)

    assert.match(setup, /fixed post-setup development sequence/i)
    assert.match(setup, /Step 3 can be skipped/i)

    assert.match(agentRules, /fixed post-setup development sequence/i)
    assert.match(agentRules, /Do not enter the next step until the current step is complete/i)
    assert.match(agentRules, /Step 3 is the only skippable step/i)
    assert.match(agentRules, /record the skipped contract step/)
})
