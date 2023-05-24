'use client';
import Ip from './ip.client';
import Map from './map.client';
import Location from './location.client';
import { useEffect, useState } from 'react';
import { GeoResponse } from '../geo/geo';

export default function Geo() {
	const [ip, setIp] = useState('');
	const [coords, setCoords] = useState({
		longitude: 0,
		latitude: 0
	});
	const [location, setLocation] = useState({
		country: 'Unknown',
		city: 'Unknown'
	});
	useEffect(() => {
		(async () => {
			const res = await fetch('/geo');
			const data: GeoResponse = await res.json();
			setIp(data.ip);
			setCoords({
				longitude: parseFloat(data.longitude) || 0,
				latitude: parseFloat(data.latitude) || 0
			});
			setLocation({
				country: data.country,
				city: data.city
			});
		})();
		return;
	}, []);
	return (
		<>
			<section className="grid h-screen w-full snap-center place-items-center bg-zinc-900">
				<Ip ip={ip} />
			</section>
			<section className="grid h-screen w-full snap-center place-items-center bg-neutral-900 text-white">
				<div className="min-h-1/2 flex h-fit w-full flex-col items-center gap-0 pb-10">
					<Location location={location} />
					<Map coords={coords} />
				</div>
			</section>
		</>
	);
}