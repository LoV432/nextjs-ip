import { headers } from 'next/headers';
import style from './home.module.css';
import type { Metadata } from 'next';
const ipHeader = process.env['IP_HEADER'] || 'X-Forwarded-For';
export const metadata: Metadata = {
	title: 'Vomit IP'
};

export default function Home() {
	let ip = headers().get(ipHeader) || 'unknow';
	const isipv6 = ip.includes(':') ? true : false;
	return (
		<div className="grid w-screen h-screen place-items-center bg-zinc-900">
			<h1 id={style.homeText} className={`${isipv6 ? 'text-justify text-[7vw]' : 'text-justify text-[11vw] md:text-[9vw]'} font-bold text-white p-2`}>
				{ip}
			</h1>
		</div>
	);
}
