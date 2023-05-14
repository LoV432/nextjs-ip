import { NextRequest } from 'next/server';
const ipHeader = process.env['IP_HEADER'] || 'X-Forwarded-For';
export const runtime = 'edge';

export function GET(req: NextRequest) {
	const ip = req.headers.get(ipHeader);
	return new Response(ip);
}
