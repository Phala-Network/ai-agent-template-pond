import { Request, Response, route } from './httpSupport'
import { renderHtml } from './uiSupport'

async function GET(req: Request): Promise<Response> {
    const tokenAddress = req.queries.tokenAddress[0] as string;
    const pondBaseUrl = `http://model-v2-api-471546444.us-east-1.elb.amazonaws.com:8001/api/v1/predict`;

    const pondResult = await fetch(pondBaseUrl);
    let pondPredictions = await pondResult.json();
    let pondPrediction;
    for (pondPrediction of pondPredictions) {
        if (pondPrediction.address == tokenAddress.toLowerCase()) {
          console.log(pondPrediction)
          break;
        }
    }

    const result = `WBTC token is predicted to move by $ ${pondPrediction.prediction} in the next hour`;

    return new Response(renderHtml(result))
}

async function POST(req: Request): Promise<Response> {
    return new Response('Not Implemented')
}

export default async function main(request: string) {
    return await route({ GET, POST }, request)
}
