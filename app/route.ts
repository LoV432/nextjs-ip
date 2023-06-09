import { type NextRequest } from 'next/server';
export const runtime = 'edge';
const ipHeader = process.env['IP_HEADER'] || 'X-Forwarded-For';

export async function GET(req: NextRequest) {
	const ip = req.headers.get(ipHeader);
	return new Response(ip, {
		status: 200,
		headers: {
			Refresh: `0; url=/home?ip=${ip}`
		}
	});
}
