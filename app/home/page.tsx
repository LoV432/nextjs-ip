import Ip from './ip.client';
import Map from './map.client';
import './home.css';
import type { Metadata } from 'next';
export const metadata: Metadata = {
	title: 'Vomit IP'
};

export default function Home() {
	return (
		<>
			<section className="grid h-screen w-full snap-center place-items-center bg-zinc-900">
				<Ip />
			</section>
			<section className="grid h-screen w-full snap-center place-items-center bg-neutral-900">
				<Map />
			</section>
		</>
	);
}
