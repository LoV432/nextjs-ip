import Ip from './ip.client';
import type { Metadata } from 'next';
export const metadata: Metadata = {
	title: 'Vomit IP'
};

export default function Home() {
	return (
		<div className="grid h-screen w-screen place-items-center bg-zinc-900">
			<Ip />
		</div>
	);
}
