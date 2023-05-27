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
		city: 'Unknown',
		isp: 'Unknown',
		asn: 'Unknown'
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
				city: data.city,
				isp: data.isp,
				asn: data.asn
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
				<div className="min-h-1/2 grid h-fit w-full grid-cols-1 place-items-center">
					<div className="flex flex-row gap-20">
						<Location location={location} />
						<Map coords={coords} />
					</div>
				</div>
			</section>
		</>
	);
}
