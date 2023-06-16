import { MutableRefObject, useRef } from 'react';
import useResizeHelper from './useResizeHelper';
import style from './home.module.css';
export default function IpInfo({ ipInfo }: { ipInfo: { country: string; city: string; isp: string; asn: string } }) {
	const textContainer = useRef(null) as unknown as MutableRefObject<HTMLDivElement>;
	const textSize = useResizeHelper(textContainer, ipInfo.country, 80);

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
