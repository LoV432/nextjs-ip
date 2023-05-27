import { MutableRefObject, useEffect, useRef, useState } from 'react';
import style from './home.module.css';
export default function Location({ location }: { location: { country: string; city: string; isp: string; asn: string } }) {
	const [textSize, setTextSize] = useState(40);
	const [lastResize, setLastResize] = useState('');
	const [triggerUseEffect, setTriggerUseEffect] = useState(false);
	const textContainer = useRef(null) as unknown as MutableRefObject<HTMLDivElement>;
	let debouncer: NodeJS.Timeout;
	function handleResize() {
		const maxSize = 80;
		const scrollWidth = textContainer.current.scrollWidth;
		const clientWidth = textContainer.current.clientWidth;
		const scrollHeight = textContainer.current.scrollHeight;
		const clientHeight = textContainer.current.clientHeight;
		if (scrollWidth > clientWidth || scrollHeight > clientHeight) {
			setTextSize(textSize - 1);
			setLastResize('minus');
			return;
		}
		if ((scrollWidth === clientWidth || scrollHeight === clientHeight) && lastResize !== 'minus' && textSize < maxSize) {
			setTextSize(textSize + 1);
			return;
		}

		setLastResize('');
	}
	function triggerResize() {
		clearInterval(debouncer);
		debouncer = setTimeout(() => {
			setTriggerUseEffect(!triggerUseEffect);
		}, 100);
	}

	useEffect(() => {
		addEventListener('resize', triggerResize);
		handleResize();
		return () => {
			removeEventListener('resize', triggerResize);
		};
	}, [textSize, location.country, location.city, triggerUseEffect]);

	let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
	const country = location.country === '-' ? '-' : regionNames.of(location.country);
	const city = location.city;
	const asn = location.asn;
	const isp = location.isp;
	return (
		<div className={`flex h-screen w-[calc(100vw-15vw)] flex-col justify-center overflow-hidden py-10 md:h-[calc(100vh-15vh)] md:max-w-md`} ref={textContainer}>
			<h1 id="countryName" style={{ fontSize: textSize }} className={`${country === '-' ? '' : style.countryText} mb-7 rounded-xl border-y-2 border-solid border-zinc-800 border-opacity-40 pb-2 pt-1 text-center tracking-widest`}>
				{country}
			</h1>
			<h1 style={{ fontSize: textSize }} className={`${city === '-' ? '' : style.cityText} mb-7 rounded-xl border-y-2 border-solid border-zinc-800 border-opacity-40 pb-2 pt-1 text-center tracking-widest`}>
				{city}
			</h1>
			<h1 style={{ fontSize: textSize }} className={`${city === '-' ? '' : style.asnText} mb-7 rounded-xl border-y-2 border-solid border-zinc-800 border-opacity-40 pb-2 pt-1 text-center tracking-widest`}>
				{asn}
			</h1>
			<h1 style={{ fontSize: textSize }} className={`${city === '-' ? '' : style.ispText} mb-7 rounded-xl border-y-2 border-solid border-zinc-800 border-opacity-40 pb-2 pt-1 text-center tracking-widest`}>
				{isp}
			</h1>
		</div>
	);
}
