'use client';
import style from './home.module.css';
import { useEffect, useState } from 'react';

export default function Ip({ ip }: { ip: string }) {
	const [clipboardAnimation, setClipboardAnimation] = useState(style.clipboardHidden);
	const [isipv6, setIsipv6] = useState(false);
	const [finalIp, setFinalIp] = useState(ip);
	function copyIp() {
		navigator.clipboard.writeText(ip);
		if (clipboardAnimation === style.clipboardAnimation) return; // Dont re-run animation if its alrdy running
		setClipboardAnimation(style.clipboardAnimation);
		setTimeout(() => {
			setClipboardAnimation(style.clipboardHidden);
		}, 2350);
	}
	useEffect(() => {
		if (ip === '') {
			const urlParams = new URLSearchParams(window.location.search);
			const ipInSearchParams = urlParams.get('ip');
			if (ipInSearchParams !== null) {
				setIsipv6(ipInSearchParams.includes(':') ? true : false);
				setFinalIp(ipInSearchParams);
				window.history.pushState({}, '', '/home'); // Remove ip from URL
			} else {
				setFinalIp('Detecting...');
			}
		} else {
			setFinalIp(ip);
		}
	}, [ip]);
	return (
		<>
			<h1 onClick={copyIp} className={`${isipv6 ? 'text-[7vw]' : 'text-[11vw] md:text-[9vw]'} ${style.homeText} select-none p-2 text-justify font-bold text-white hover:cursor-pointer`}>
				{finalIp}
			</h1>
			<div className={`${style.clipboard} fixed bottom-14 rounded-lg p-3 text-lg font-semibold text-black ${clipboardAnimation}`}>Copied to clipboard!</div>
		</>
	);
}
