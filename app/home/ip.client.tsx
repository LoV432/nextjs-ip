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
	function scrollToBottom() {
		window.scrollTo({
			top: document.body.scrollHeight,
			behavior: 'smooth'
		});
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
			<div className="flex flex-col items-center gap-20">
				<h1 onClick={copyIp} className={`${isipv6 ? 'text-[7vw]' : 'text-[11vw] md:text-[9vw]'} ${style.homeText} select-none p-2 text-justify font-bold text-white hover:cursor-pointer`}>
					{finalIp}
				</h1>
				<svg onClick={scrollToBottom} className={`${style.scrollDownAnimation} ${finalIp === 'Detecting...' || finalIp === '' ? 'hidden' : ''} h-8 w-8 rounded-full fill-rose-900 hover:cursor-pointer`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
					<path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
				</svg>
			</div>
			<div className={`${style.clipboard} fixed bottom-14 rounded-lg p-3 text-lg font-semibold text-black ${clipboardAnimation}`}>Copied to clipboard!</div>
		</>
	);
}
