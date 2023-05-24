export default function Location({ location }: { location: { country: string; city: string } }) {
	return (
		<>
			<h1 className={`select-none text-justify text-6xl font-bold`}>{location.country}</h1>
			<h1 className={`select-none text-justify text-6xl font-bold`}>{location.city}</h1>
		</>
	);
}
