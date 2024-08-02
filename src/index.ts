import { Request, Response, route } from './httpSupport'
import { renderHtml } from './uiSupport'

async function GET(req: Request): Promise<Response> {
    const tokenAddress = req.queries.tokenAddress[0] as string;
    const pondBaseUrl = `http://model-v2-api-471546444.us-east-1.elb.amazonaws.com:8001/api/v1/predict/${tokenAddress.toLowerCase()}`;

    const pondResult = await fetch(pondBaseUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let pondPredictions = await pondResult.json();
    pondPredictions.sort((a: { predict_at: number; }, b: { predict_at: number; }) => b.predict_at - a.predict_at);

    const result = `WBTC token is predicted to move by $${pondPredictions[0].prediction} in the next hour`;

    return new Response(renderHtml(result))
}

async function POST(req: Request): Promise<Response> {
    return new Response('Not Implemented')
}

export default async function main(request: string) {
    return await route({ GET, POST }, request)
}
