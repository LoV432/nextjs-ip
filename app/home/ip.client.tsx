'use client';
import style from './home.module.css';
import { useState } from 'react';

export default function Ip({ ip }: { ip: string }) {
	const [clipboardAnimation, setClipboardAnimation] = useState(style.clipboardHidden);

	const isipv6 = ip.includes(':') ? true : false;
	function copyIp() {
		navigator.clipboard.writeText(ip);
		if (clipboardAnimation === style.clipboardAnimation) return; // Dont re-run animation if its alrdy running
		setClipboardAnimation(style.clipboardAnimation);
		setTimeout(() => {
			setClipboardAnimation(style.clipboardHidden);
		}, 2350);
	}
	return (
		<>
			<h1 onClick={copyIp} className={`${isipv6 ? 'text-[7vw]' : 'text-[11vw] md:text-[9vw]'} ${style.homeText} text-justify font-bold text-white p-2 hover:cursor-pointer select-none`}>
				{ip}
			</h1>
			<div className={`fixed bottom-14 margin-auto text-right text-md bg-rose-900 text-black font-semibold rounded-lg p-3 ${clipboardAnimation}`}>Copied to clipboard!</div>
		</>
	);
}
