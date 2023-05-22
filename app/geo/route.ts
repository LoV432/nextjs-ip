import { NextResponse, type NextRequest } from 'next/server';
export const runtime = 'edge';
const ipHeader = process.env['IP_HEADER'] || '';
const continentHeader = process.env['CONTINENT_HEADER'] || '';
const countryHeader = process.env['COUNTRY_HEADER'] || '';
const stateHeader = process.env['STATE_HEADER'] || '';
const cityHeader = process.env['CITY_HEADER'] || '';
const longitudeHeader = process.env['LONGITUDE_HEADER'] || '';
const latitudeHeader = process.env['LATITUDE_HEADER'] || '';

export async function GET(req: NextRequest) {
	const ip = getValueFromHeader(ipHeader, req);
	const continent = getValueFromHeader(continentHeader, req);
	const country = getValueFromHeader(countryHeader, req);
	const state = getValueFromHeader(stateHeader, req);
	const city = getValueFromHeader(cityHeader, req);
	const longitude = getValueFromHeader(longitudeHeader, req);
	const latitude = getValueFromHeader(latitudeHeader, req);
	return NextResponse.json({ ip, continent, country, state, city, longitude, latitude });
}

function getValueFromHeader(header: string, req: NextRequest) {
	if (header !== '') return req.headers.get(header) || 'Unknown';
	return 'Unknown';
}
