import { NextRequest, NextResponse } from 'next/server';
const ipHeader = process.env['IP_HEADER'] || 'X-Forwarded-For';
export const config = {
	runtime: 'edge'
};

export default (req: NextRequest, res: NextResponse) => {
	const ip = req.headers.get(ipHeader);
	res.headers.set('cache-control', 'no-store');
	return new Response(ip);
};
