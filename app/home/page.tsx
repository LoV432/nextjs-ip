import { headers } from 'next/headers';
import Ip from './ip.client';
import type { Metadata } from 'next';
const ipHeader = process.env['IP_HEADER'] || 'X-Forwarded-For';
export const metadata: Metadata = {
	title: 'Vomit IP'
};

export default function Home() {
	let ip = headers().get(ipHeader) || 'unknown';
	return (
		<div className="grid h-screen w-screen place-items-center bg-zinc-900">
			<Ip ip={ip} />
		</div>
	);
}
