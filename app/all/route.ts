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
	const data = await fetchIpData(ip);
	let country = getValueFromJson(data, 'country');
	let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
	country = country === '-' ? '-' : (regionNames.of(country) as string);
	let state = getValueFromJson(data, 'region');
	let city = getValueFromJson(data, 'city');
	state = state === country ? '-' : state;
	city = city === country ? '-' : city;
	const loc = getValueFromJson(data, 'loc');
	let longitude: string = '-';
	let latitude: string = '-';
	if (loc !== '-') {
		longitude = loc.split(',')[1];
		latitude = loc.split(',')[0];
	}
	const org = getValueFromJson(data, 'org');
	let isp: string = '-';
	let asn: string = '-';
	if (org !== '-') {
		isp = org.split(/ (.*)/s)[1];
		asn = org.split(/ (.*)/s)[0];
	}
	return NextResponse.json({ ip, country, state, city, longitude, latitude, isp, asn });
}

function getValueFromHeader(header: string, req: NextRequest) {
	if (header !== '') return req.headers.get(header) || '-';
	return '-';
}

function getValueFromJson(json: any, key: string) {
	return (json[key] as string) || '-';
}

async function fetchIpData(ip: string) {
	const res = await fetch(`https://ipinfo.io/${ip}/json?token=${ipInfoToken}`);
	const data: ipInfoResponse = await res.json();
	return data;
}
