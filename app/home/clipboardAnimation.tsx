import style from './home.module.css';
import { useEffect, useRef, useState } from 'react';
import { atom, useRecoilState } from 'recoil';

export const clipboardState = atom({ key: 'clipboardState', default: true });
export default function clipboardAnimation() {
	const [clipboardAnimation, setClipboardAnimation] = useState(style.clipboardHidden);
	const [trigger] = useRecoilState(clipboardState);
	const firstRender = useRef(true);
	function triggerAnimation() {
		if (clipboardAnimation === style.clipboardAnimation) return; // Dont re-run animation if its alrdy running
		setClipboardAnimation(style.clipboardAnimation);
		setTimeout(() => {
			setClipboardAnimation(style.clipboardHidden);
		}, 2350);
	}
	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false;
			return;
		}
		triggerAnimation();
	}, [trigger]);

	return (
		<div className="flex flex-col items-center">
			<div className={`${style.clipboard} fixed bottom-14 rounded-lg p-3 text-lg font-semibold text-black ${clipboardAnimation}`}>Copied to clipboard!</div>
		</div>
	);
}
