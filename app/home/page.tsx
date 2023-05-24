import Geo from './geo.client';
import './home.css';
import type { Metadata } from 'next';
export const metadata: Metadata = {
	title: 'Vomit IP'
};

export default function Home() {
	return <Geo />;
}
