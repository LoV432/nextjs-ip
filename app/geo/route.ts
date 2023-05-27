import { NextResponse, type NextRequest } from 'next/server';
export const runtime = 'edge';
const ipHeader = process.env['IP_HEADER'] || '';
const ipInfoToken = process.env['IPINFO_TOKEN'] || '';

export type ipInfoResponse = {
	city?: string;
	region?: string;
	country?: string;
	loc?: string;
	org?: string;
};

export async function GET(req: NextRequest) {
	const ip = getValueFromHeader(ipHeader, req);
	const res = await fetch(`https://ipinfo.io/${ip}/json?token=${ipInfoToken}`);
	const data: ipInfoResponse = await res.json();
	const country = getValueFromJson(data, 'country');
	const state = getValueFromJson(data, 'region');
	const city = getValueFromJson(data, 'city');
	const loc = getValueFromJson(data, 'loc');
	const longitude = loc !== 'Unknown' ? loc.split(',')[1] : '';
	const latitude = loc !== 'Unknown' ? loc.split(',')[0] : '';
	return NextResponse.json({ ip, country, state, city, longitude, latitude });
}

function getValueFromHeader(header: string, req: NextRequest) {
	if (header !== '') return req.headers.get(header) || 'Unknown';
	return 'Unknown';
}

function getValueFromJson(json: any, key: string) {
	return (json[key] as string) || 'Unknown';
}
