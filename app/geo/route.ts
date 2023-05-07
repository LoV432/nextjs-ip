import { NextResponse, type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
	const city = req.headers.get('cf-ipcity') || 'Unknown';
	const country = req.headers.get('cf-ipcountry') || 'Unknown';
	const continent = req.headers.get('cf-continent') || 'Unknown';
	const longitude = req.headers.get('cf-iplongitude') || 'Unknown';
	const latitude = req.headers.get('cf-iplatitude') || 'Unknown';
	return NextResponse.json({ city, country, continent, longitude, latitude });
}
