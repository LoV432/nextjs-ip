'use client';
import style from './home.module.css';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import useResizeHelper from './useResizeHelper';

export default function Ip({ ip }: { ip: string }) {
	const [clipboardAnimation, setClipboardAnimation] = useState(style.clipboardHidden);
	const [finalIp, setFinalIp] = useState(ip);
	const textContainer = useRef(null) as unknown as MutableRefObject<HTMLDivElement>;
	const textSize = useResizeHelper(textContainer, finalIp, 200);
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
				<div ref={textContainer} className="w-[calc(100vw-15vw)] overflow-hidden">
					<h1 style={{ fontSize: textSize }} onClick={copyIp} className={`${style.homeText} select-none p-2 text-center font-bold text-white hover:cursor-pointer`}>
						{finalIp}
					</h1>
				</div>
				<div onClick={scrollToBottom} className="h-16 w-16 hover:cursor-pointer">
					<div className={`${style.scrollDownAnimation} ${finalIp === 'Detecting...' || finalIp === '' ? 'hidden' : ''} h-16 w-16`}></div>
				</div>
			</div>
			<div className={`${style.clipboard} fixed bottom-14 rounded-lg p-3 text-lg font-semibold text-black ${clipboardAnimation}`}>Copied to clipboard!</div>
			<svg className="absolute h-0 w-0" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
				<g>
					<clipPath id="arrowDown">
						<path className={'translate-x-4 translate-y-3 scale-[0.08]'} fill="#EC008C" d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
					</clipPath>
				</g>
			</svg>
		</>
	);
}
