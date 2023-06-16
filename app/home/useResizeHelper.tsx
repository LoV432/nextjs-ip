import { useRef, useEffect, useState, MutableRefObject } from 'react';
export default function useResizeHelper(textContainer: MutableRefObject<HTMLDivElement>, triggerVar: string, maxSize: number) {
	const [lastResize, setLastResize] = useState('');
	const [triggerUseEffect, setTriggerUseEffect] = useState(false);
	const [textSize, setTextSize] = useState(40);
	const debouncer = useRef() as unknown as MutableRefObject<NodeJS.Timeout>;
	function handleResize(textContainer: MutableRefObject<HTMLDivElement>, maxSize: number) {
		const scrollWidth = textContainer.current.scrollWidth;
		const clientWidth = textContainer.current.clientWidth;
		const scrollHeight = textContainer.current.scrollHeight;
		const clientHeight = textContainer.current.clientHeight;
		if (scrollWidth > clientWidth || scrollHeight > clientHeight) {
			setTextSize(textSize - 5);
			setLastResize('minus');
			return;
		}
		if ((scrollWidth === clientWidth || scrollHeight === clientHeight) && lastResize !== 'minus' && textSize < maxSize) {
			setTextSize(textSize + 5);
			return;
		}

		setLastResize('');
	}
	function triggerResize() {
		clearInterval(debouncer.current);
		debouncer.current = setTimeout(() => {
			setTriggerUseEffect(!triggerUseEffect);
		}, 100);
	}
	useEffect(() => {
		addEventListener('resize', triggerResize);
		handleResize(textContainer, maxSize);
		return () => {
			removeEventListener('resize', triggerResize);
		};
	}, [triggerUseEffect, textSize, triggerVar]);
	return textSize;
}
