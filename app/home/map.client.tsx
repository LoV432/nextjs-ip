'use client';
import { useEffect } from 'react';
import { useState } from 'react';
import { GeoResponse } from '../geo/geo';

export default function Map() {
	const [mapLink, setMapLink] = useState('');

	useEffect(() => {
		(async () => {
			const res = await fetch('/geo');
			const data: GeoResponse = await res.json();
			const longitude = parseFloat(data.longitude);
			const latitude = parseFloat(data.latitude);
			if (longitude && latitude) setMapLink(getMapLink(longitude, latitude));
		})();
	}, []);
	return <iframe src={mapLink} className="aspect-square w-80 md:w-1/3 lg:w-1/4" />;
}

function getMapLink(longitude: number, latitude: number) {
	// https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames
	const EARTH_CIR_METERS = 40075016.686;
	const degreesPerMeter = 360 / EARTH_CIR_METERS;
	const zoom = 13;
	const width = 450;
	const height = 350;

	function toRadians(degrees: number) {
		return (degrees * Math.PI) / 180;
	}

	const metersPerPixelEW = EARTH_CIR_METERS / Math.pow(2, zoom + 8);
	const metersPerPixelNS = (EARTH_CIR_METERS / Math.pow(2, zoom + 8)) * Math.cos(toRadians(latitude));

	const shiftMetersEW = (width / 2) * metersPerPixelEW;
	const shiftMetersNS = (height / 2) * metersPerPixelNS;

	const shiftDegreesEW = shiftMetersEW * degreesPerMeter;
	const shiftDegreesNS = shiftMetersNS * degreesPerMeter;

	const south = latitude - shiftDegreesNS;
	const west = longitude - shiftDegreesEW;
	const north = latitude + shiftDegreesNS;
	const east = longitude + shiftDegreesEW;

	return `https://www.openstreetmap.org/export/embed.html?bbox=${west},${south},${east},${north}&layer=mapnik&marker=${latitude},${longitude}`;
}
