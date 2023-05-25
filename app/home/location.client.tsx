import { MutableRefObject, useEffect, useRef, useState } from 'react';
import style from './home.module.css';
export default function Location({ location }: { location: { country: string; city: string } }) {
	const [textSize, setTextSize] = useState(60);
	const textContainer = useRef(null) as unknown as MutableRefObject<HTMLDivElement>;

	useEffect(() => {
		if (textContainer.current.scrollWidth > textContainer.current.clientWidth) {
			setTextSize(textSize - 1);
		}
	}, [textSize]);

	let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
	const country = location.country === 'Unknown' ? '-' : regionNames.of(location.country);
	const city = location.city === 'Unknown' ? '-' : location.city;
	return (
		<div className={`flex w-screen flex-col items-center overflow-hidden px-4 text-center md:px-0`} ref={textContainer}>
			<h1 id="countryName" style={{ fontSize: textSize }} className={`${country === '-' ? '' : style.countryText} truncate rounded-xl border-b-2 border-solid border-zinc-800 border-opacity-40 px-4 font-bold tracking-widest`}>
				{country}
			</h1>
			<h1 style={{ fontSize: textSize }} className={`${city === '-' ? '' : style.cityText} mb-7 truncate rounded-xl border-b-2 border-solid border-zinc-800 border-opacity-40 px-4 font-bold tracking-widest`}>
				{city}
			</h1>
		</div>
	);
}
