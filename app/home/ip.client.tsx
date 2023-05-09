'use client';
import style from './home.module.css';
import { useState } from 'react';

export default function Ip({ ip }: { ip: string }) {
	const [clipboardVisiblity, setClipboardVisiblity] = useState(false);
	const [clipboardAnimation, setClipboardAnimation] = useState('');

	const isipv6 = ip.includes(':') ? true : false;
	function copyIp() {
		navigator.clipboard.writeText(ip);
		setClipboardVisiblity(true);
		setClipboardAnimation(style.clipboardAnimation);
		setTimeout(() => {
			setClipboardAnimation(style.clipboardAnimationHide);
			setTimeout(() => {
				setClipboardVisiblity(false);
				setClipboardAnimation('');
			}, 350);
		}, 2000);
	}
	return (
		<>
			<h1 onClick={copyIp} id={style.homeText} className={`${isipv6 ? 'text-justify text-[7vw]' : 'text-justify text-[11vw] md:text-[9vw]'} font-bold text-white p-2 hover:cursor-pointer`}>
				{ip}
			</h1>
			<div id="clipboardText" className={`fixed bottom-14 margin-auto text-right text-md bg-rose-900 text-black font-semibold rounded-lg p-3 ${clipboardAnimation} ${clipboardVisiblity ? '' : 'hidden'}`}>
				Copied to clipboard!
			</div>
		</>
	);
}
