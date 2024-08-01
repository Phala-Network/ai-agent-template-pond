import main from './index'
import 'dotenv/config'

async function execute(inputObj: any) {
    const inputJson = JSON.stringify(inputObj)
    console.log('INPUT:', inputJson)
    return await main(inputJson)
}

async function test() {
    const getResult = await execute({
        method: 'GET',
        path: '/ipfs/QmVHbLYhhYA5z6yKpQr4JWr3D54EhbSsh7e7BFAAyrkkMf',
        queries: {
            tokenAddress: ["0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"],
        },
        headers: {},
    })
    console.log('GET RESULT:', JSON.parse(getResult))

    const testArgsString = JSON.stringify({
        method: 'GET',
        path: '/ipfs/QmVHbLYhhYA5z6yKpQr4JWr3D54EhbSsh7e7BFAAyrkkMf',
        queries: {
            tokenAddress: ["0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599"],
        },
        headers: {},
    })
    console.log(`\nTo test in the SideVM playground go to https://phat.phala.network/contracts/view/0xf0a398600f02ea9b47a86c59aed61387e450e2a99cb8b921cd1d46f734e45409\n\nConnect you polkadot.js account and select 'run_js' with the parameters:\n- engine: SidevmQuickJSWithPolyfill\n- js_code: Source code text of dist/index.ts\n- args: ${testArgsString}`);
    console.log('Watch video here for to see the visual steps of testing in Sidevm playground: https://www.youtube.com/watch?v=fNqNeLfFFME');
    console.log(`\nMake sure to replace queries and secret with your values compatible with your AI Agent Contract.`);

}

test().then(() => { }).catch(err => console.error(err)).finally(() => process.exit())
