'use client';
import style from './home.module.css';
import { useEffect, useState } from 'react';
import { GeoResponse } from '../geo/geo.d';

export default function Ip() {
	const [clipboardAnimation, setClipboardAnimation] = useState(style.clipboardHidden);
	const [ip, setIp] = useState('');
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
		const urlParams = new URLSearchParams(window.location.search);
		const ipInSearchParams = urlParams.get('ip');
		if (ipInSearchParams !== null) {
			setIp(ipInSearchParams);
			setIsipv6(ipInSearchParams.includes(':') ? true : false);
			window.history.pushState({}, '', '/home'); // Remove ip from URL
		} else {
			setIp('Detecting...');
		}

		(async () => {
			const requestIp = await fetch('/geo');
			const realIp: GeoResponse = await requestIp.json();
			setIsipv6(realIp.ip.includes(':') ? true : false);
			setIp(realIp.ip);
		})();
		return () => {};
	}, []);
	return (
		<>
			<h1 onClick={copyIp} className={`${isipv6 ? 'text-[7vw]' : 'text-[11vw] md:text-[9vw]'} ${style.homeText} select-none p-2 text-justify font-bold text-white hover:cursor-pointer`}>
				{ip}
			</h1>
			<div className={`${style.clipboard} fixed bottom-14 rounded-lg p-3 text-lg font-semibold text-black ${clipboardAnimation}`}>Copied to clipboard!</div>
		</>
	);
}
