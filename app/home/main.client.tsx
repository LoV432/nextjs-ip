'use client';
import Ip from './ip.client';
import Map from './map.client';
import IpInfo from './ipinfo.client';
import { useEffect, useState } from 'react';
import { AllResponse } from '../all/all';

export default function Geo() {
	const [ip, setIp] = useState('');
	const [coords, setCoords] = useState({
		longitude: 0,
		latitude: 0
	});
	const [ipInfo, setIpInfo] = useState({
		country: '-',
		city: '-',
		isp: '-',
		asn: '-'
	});
	useEffect(() => {
		(async () => {
			const res = await fetch('/all');
			const data: AllResponse = await res.json();
			setIp(data.ip);
			setCoords({
				longitude: parseFloat(data.longitude) || 0,
				latitude: parseFloat(data.latitude) || 0
			});
			setIpInfo({
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
				<Ip ipFromParent={ip} />
			</section>
			<section className="grid h-screen w-full snap-center place-items-center bg-neutral-900 text-white">
				<div className="min-h-1/2 grid h-fit w-full grid-cols-1 place-items-center">
					<div className="flex flex-row gap-20">
						<IpInfo ipInfo={ipInfo} />
						<Map coords={coords} />
					</div>
				</div>
			</section>
		</>
	);
}
