import style from './home.module.css';
export default function Location({ location }: { location: { country: string; city: string } }) {
	let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
	const country = location.country === 'Unknown' ? '-' : regionNames.of(location.country);
	const city = location.city === 'Unknown' ? '-' : location.city;
	return (
		<>
			<h1 className={`${country === '-' ? '' : style.countryText} text-justify text-6xl font-bold`}>{country}</h1>
			<h1 className={`${city === '-' ? '' : style.cityText} text-justify text-6xl font-bold`}>{city}</h1>
		</>
	);
}
