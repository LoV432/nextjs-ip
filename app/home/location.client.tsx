export default function Location({ location }: { location: { country: string; city: string } }) {
	let regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
	const country = location.country === 'Unknown' ? '-' : regionNames.of(location.country);
	const city = location.city === 'Unknown' ? '-' : location.city;
	return (
		<>
			<h1 className={`select-none text-justify text-6xl font-bold`}>{location.country}</h1>
			<h1 className={`select-none text-justify text-6xl font-bold`}>{location.city}</h1>
		</>
	);
}
