import { spawnSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { deflateSync } from 'node:zlib'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const workspace = mkdtempSync(join(tmpdir(), 'template-create-verify-'))
const packageInfo = JSON.parse(readFileSync(join(root, 'packages/create-template-react/package.json'), 'utf8'))
const archive = join(root, `packages/create-template-react/jcy-create-template-react-${packageInfo.version}.tgz`)

function run(command, args, cwd, expected = 0) {
    const result = spawnSync(command, args, { cwd, encoding: 'utf8', env: process.env })
    const output = `${result.stdout ?? ''}${result.stderr ?? ''}`
    if ((expected === 0 && result.status !== 0) || (expected !== 0 && result.status === 0)) {
        throw new Error(`${command} ${args.join(' ')} (${cwd}) exited ${result.status}\n${output.slice(-24000)}`)
    }
    return output
}

function replaceFile(rootDir, path, from, to) {
    const target = join(rootDir, path)
    const content = readFileSync(target, 'utf8')
    if (!content.includes(from)) throw new Error(`Missing configuration target: ${path} ${from}`)
    writeFileSync(target, content.replace(from, to))
}

function chunk(type, data) {
    const name = Buffer.from(type)
    const body = Buffer.concat([name, data])
    let crc = 0xffffffff
    for (const byte of body) {
        crc ^= byte
        for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0)
    }
    const result = Buffer.alloc(data.length + 12)
    result.writeUInt32BE(data.length)
    body.copy(result, 4)
    result.writeUInt32BE((crc ^ 0xffffffff) >>> 0, result.length - 4)
    return result
}

function fixturePng(width, height) {
    const header = Buffer.alloc(13)
    header.writeUInt32BE(width)
    header.writeUInt32BE(height, 4)
    header[8] = 8
    header[9] = 6
    const pixels = Buffer.alloc((width * 4 + 1) * height)
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const offset = y * (width * 4 + 1) + 1 + x * 4
            pixels.set([36, 92, 132, 255], offset)
        }
    }
    return Buffer.concat([Buffer.from('89504e470d0a1a0a', 'hex'), chunk('IHDR', header), chunk('IDAT', deflateSync(pixels)), chunk('IEND', Buffer.alloc(0))])
}

const scenarios = [
    { name: 'defaults', base: '/h5/', configure() {} },
    {
        name: 'root-tabbar-account-six-decimals', base: '/',
        configure(target) {
            replaceFile(target, 'src/config/deployment.ts', "normalizeRouteBase('/h5/')", "normalizeRouteBase('/')")
            replaceFile(target, 'src/config/app.ts', 'defaultLayoutMenuType: APP_LAYOUT_MENU_TYPE.sidebar', 'defaultLayoutMenuType: APP_LAYOUT_MENU_TYPE.tabbar')
            replaceFile(target, 'src/config/app.ts', 'loginMode: APP_LOGIN_MODE.dapp', 'loginMode: APP_LOGIN_MODE.account')
            replaceFile(target, 'src/config/app.ts', "APP_HOME_ROUTE_NAME = 'home'", "APP_HOME_ROUTE_NAME = 'overview'")
            replaceFile(target, 'src/services/dapp/config.ts', 'amountDecimals: 18', 'amountDecimals: 6')
            replaceFile(target, 'src/services/dapp/config.ts', 'enableErc20MaxApprove: true', 'enableErc20MaxApprove: false')
            rmSync(join(target, '.vscode'), { recursive: true, force: true })
            const languagePath = join(target, 'src/i18n/config.ts')
            const languages = readFileSync(languagePath, 'utf8')
            const reduced = languages.replace(/    \{\n        name: '繁體中文'[\s\S]*?    \},\n/, '')
            if (reduced === languages) throw new Error('Failed to configure a reduced language set')
            writeFileSync(languagePath, reduced)
        },
    },
    {
        name: 'nested-hybrid-disabled-i18n-gas', base: '/mobile/app/',
        configure(target) {
            replaceFile(target, 'src/config/deployment.ts', "normalizeRouteBase('/h5/')", "normalizeRouteBase('/mobile/app/')")
            replaceFile(target, 'src/config/app.ts', 'loginMode: APP_LOGIN_MODE.dapp', 'loginMode: APP_LOGIN_MODE.hybrid')
            replaceFile(target, 'src/config/app.ts', 'enableI18n: true', 'enableI18n: false')
            replaceFile(target, 'src/services/dapp/config.ts', "import { bsc } from 'viem/chains'", "import { mainnet } from 'viem/chains'")
            replaceFile(target, 'src/services/dapp/config.ts', 'DAPP_PRODUCTION_CHAIN = bsc', 'DAPP_PRODUCTION_CHAIN = mainnet')
            replaceFile(target, 'src/services/dapp/config.ts', 'enableGasCheck: false', 'enableGasCheck: true')
            replaceFile(target, 'src/services/dapp/config.ts', 'enableGasEstimate: false', 'enableGasEstimate: true')
        },
    },
]

try {
    console.log('Building final creator package')
    run('pnpm', ['create:local'], root)
    const extracted = join(workspace, 'creator')
    mkdirSync(extracted)
    run('tar', ['-xzf', archive, '-C', extracted], root)
    const cli = join(extracted, 'package/bin/create-template-react')
    for (const scenario of scenarios) {
        console.log(`Verifying generated project: ${scenario.name}`)
        const target = join(workspace, scenario.name)
        run(process.execPath, [cli, target], root)
        if (existsSync(join(target, 'tests/template-maintenance')) || existsSync(join(target, 'scripts/pack-create-template.mjs'))) {
            throw new Error('Creator maintenance source leaked into generated project')
        }
        scenario.configure(target)
        run('pnpm', ['install', '--offline', '--frozen-lockfile'], target)
        const blocked = run(process.execPath, ['scripts/verify-brand-assets.mjs'], target, 1)
        if (!blocked.includes('placeholder')) throw new Error('Expected the uninitialized brand guard')
        const logo = join(workspace, 'fixture-logo.png')
        writeFileSync(logo, fixturePng(32, 32))
        cpSync(logo, join(target, 'public/brand/app-logo.png'))
        run('pnpm', ['favicon:generate'], target)
        const statusPath = join(target, 'public/brand/brand-status.json')
        const status = JSON.parse(readFileSync(statusPath, 'utf8'))
        writeFileSync(statusPath, JSON.stringify({ ...status, isProjectLogoReady: true }, null, 4))
        const empty = join(workspace, 'fixture-empty.png')
        writeFileSync(empty, fixturePng(368, 244))
        run('pnpm', ['empty:asset', '--', '--input', empty], target)
        const output = run('pnpm', ['build'], target)
        writeFileSync(join(workspace, `${scenario.name}.log`), output)
        const html = readFileSync(join(target, 'dist/index.html'), 'utf8')
        if (!html.includes(`${scenario.base}assets/`)) throw new Error(`Wrong built resource prefix: ${scenario.base}`)
        if (!existsSync(join(target, 'dist/brand/app-logo.png'))) throw new Error('Missing built brand asset')
        console.log(`Passed ${scenario.name}: install, lint, tests, production build and resource paths`)
    }
    rmSync(workspace, { recursive: true, force: true })
    console.log('All final-package project scenarios passed; template placeholder brand remains unmodified.')
} catch (error) {
    console.error(error instanceof Error ? error.message : error)
    console.error(`Verification workspace preserved: ${workspace}`)
    process.exitCode = 1
}
