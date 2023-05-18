'use client';
import style from './home.module.css';
import { useEffect, useState } from 'react';

export default function Ip() {
	const [clipboardAnimation, setClipboardAnimation] = useState(style.clipboardHidden);
	const [ip, setIp] = useState('Detecting...');
	const [isipv6, setIsipv6] = useState(false);
	function copyIp() {
		navigator.clipboard.writeText(ip);
		if (clipboardAnimation === style.clipboardAnimation) return; // Dont re-run animation if its alrdy running
		setClipboardAnimation(style.clipboardAnimation);
		setTimeout(() => {
			setClipboardAnimation(style.clipboardHidden);
		}, 2350);
	}

	useEffect(() => {
		(async () => {
			const requestIp = await fetch('/');
			const realIp = await requestIp.text();
			setIsipv6(realIp.includes(':') ? true : false);
			setIp(realIp);
		})();
		return () => {};
	}, []);
	return (
		<>
			<h1 onClick={copyIp} className={`${isipv6 ? 'text-[7vw]' : 'text-[11vw] md:text-[9vw]'} ${style.homeText} select-none p-2 text-justify font-bold text-white hover:cursor-pointer`}>
				{ip}
			</h1>
			<div className={`${style.clipboard} margin-auto fixed bottom-14 rounded-lg p-3 text-lg font-semibold text-black ${clipboardAnimation}`}>Copied to clipboard!</div>
		</>
	);
}
