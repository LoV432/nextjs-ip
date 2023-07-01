'use client';
import style from './home.module.css';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import useResizeHelper from './useResizeHelper';
import { clipboardState } from './clipboardAnimation';
import { useRecoilState } from 'recoil';

export default function Ip({ ipFromParent }: { ipFromParent: string }) {
	const [ip, setIp] = useState(ipFromParent);
	const textContainer = useRef(null) as unknown as MutableRefObject<HTMLDivElement>;
	const textSize = useResizeHelper(textContainer, ip, 200);
	const [clipboardAnimation, triggerClipboardAnimation] = useRecoilState(clipboardState);
	function copyIp() {
		navigator.clipboard.writeText(ip);
		triggerClipboardAnimation(!clipboardAnimation);
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
				setIp(ipInSearchParams);
				window.history.pushState({}, '', '/home'); // Remove ip from URL
			} else {
				setIp('Detecting...');
			}
		} else {
			setIp(ipFromParent);
		}
	}, [ipFromParent]);
	return (
		<>
			<div className="flex flex-col items-center gap-20">
				<div ref={textContainer} className="w-[calc(100vw-15vw)] overflow-hidden">
					<h1 style={{ fontSize: textSize }} onClick={copyIp} className={`${style.homeText} select-none p-2 text-center font-bold text-white hover:cursor-pointer`}>
						{ip}
					</h1>
				</div>
				<div onClick={scrollToBottom} className="h-16 w-16 hover:cursor-pointer">
					<div className={`${style.scrollDownAnimation} ${ip === 'Detecting...' || ip === '' ? 'hidden' : ''} h-16 w-16`}></div>
				</div>
			</div>
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
