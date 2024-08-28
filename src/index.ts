import { Request, Response, route } from './httpSupport'

async function GET(req: Request): Promise<Response> {
    let result = { message: '' }
    const secrets = req.secret || {}
    const queries = req.queries
    const tokenAddress = (queries.tokenAddress) ? queries.tokenAddress[0] as string : '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599'
    const pondBaseUrl = `http://model-v2-api-471546444.us-east-1.elb.amazonaws.com:8001/api/v1/predict/${tokenAddress.toLowerCase()}`;

    try {
        const pondResult = await fetch(pondBaseUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!pondResult.ok) {
            result.message = `HTTP Error Status: ${pondResult.status}`
        } else {
            let pondPredictions = await pondResult.json();
            pondPredictions.sort((a: { predict_at: number; }, b: { predict_at: number; }) => b.predict_at - a.predict_at)

            result.message = `WBTC token is predicted to move by $${pondPredictions[0].prediction} in the next hour`
        }
    } catch (error) {
        console.log(error)
        result.message = `Error: ${error}`
    }

    return new Response(JSON.stringify(result))
}

async function POST(req: Request): Promise<Response> {
    return new Response('Not Implemented')
}

export default async function main(request: string) {
    return await route({ GET, POST }, request)
}
