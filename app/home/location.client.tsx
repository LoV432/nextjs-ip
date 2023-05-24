import style from './home.module.css';
export default function Location({ location }: { location: { country: string; city: string } }) {
	let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
	const country = location.country === 'Unknown' ? '-' : regionNames.of(location.country);
	const city = location.city === 'Unknown' ? '-' : location.city;
	return (
		<>
			<h1 className={`${country === '-' ? '' : style.countryText} rounded-xl border-b-2 border-solid border-zinc-800 border-opacity-40 px-4 text-justify text-[3.75rem] font-bold`}>{country}</h1>
			<h1 className={`${city === '-' ? '' : style.cityText} mb-7 rounded-xl border-b-2 border-solid border-zinc-800 border-opacity-40 px-4 text-justify text-[3.75rem] font-bold`}>{city}</h1>
		</>
	);
}
