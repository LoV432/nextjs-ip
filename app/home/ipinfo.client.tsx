import { MutableRefObject, useEffect, useRef, useState } from 'react';
import style from './home.module.css';
export default function IpInfo({ ipInfo }: { ipInfo: { country: string; city: string; isp: string; asn: string } }) {
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
	}, [textSize, ipInfo.country, ipInfo.city, triggerUseEffect]);

	const country = ipInfo.country;
	const city = ipInfo.city;
	const asn = ipInfo.asn;
	const isp = ipInfo.isp;
	return (
		<div className={`flex h-screen w-[calc(100vw-15vw)] flex-col justify-center overflow-hidden py-10 md:h-[calc(100vh-15vh)] md:max-w-md`} ref={textContainer}>
			<GradientText text={country} textSize={textSize} gradientStyle={style.countryText} />
			<GradientText text={city} textSize={textSize} gradientStyle={style.cityText} />
			<GradientText text={asn} textSize={textSize} gradientStyle={style.asnText} />
			<GradientText text={isp} textSize={textSize} gradientStyle={style.ispText} />
		</div>
	);
}

function GradientText({ text, textSize, gradientStyle }: { text: string; textSize: number; gradientStyle: string }) {
	return (
		<h1 style={{ fontSize: textSize }} className={`${text === '-' ? '' : gradientStyle} mb-7 rounded-xl border-y-2 border-solid border-zinc-800 border-opacity-40 pb-2 pt-1 text-center tracking-widest`}>
			{text}
		</h1>
	);
}
