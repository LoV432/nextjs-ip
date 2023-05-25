'use client';
import style from './home.module.css';
export default function Map({ coords }: { coords: { longitude: number; latitude: number } }) {
	const mapLink = getMapLink(coords.longitude, coords.latitude);
	return (
		<div className={`${style.mapBorder} aspect-square w-80 rounded-xl p-[1px] md:w-1/3`}>
			<div className="h-full w-full rounded-xl bg-neutral-900">
				<iframe src={mapLink} className="h-full w-full rounded-xl border-hidden outline-none grayscale invert filter" />
			</div>
		</div>
	);
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
