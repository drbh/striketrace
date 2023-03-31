<script lang="ts">
	import { LayerCake, Svg } from 'layercake';
	import AxisX from '../components/AxisX.svelte';
	import AxisY from '../components/AxisY.svelte';
	import Circle from '../components/Circle.svelte';
	import Line from '../components/Line.svelte';
	import { data, xKey, yKey } from '../stores/legs';
	import { onMount } from 'svelte';
	import { getValueAtPrice } from '../logic/legs';

	export let xMin: number;
	export let xMax: number;
	export let yMin: number;
	export let yMax: number;
	export let panEndPosRel: { x: number; y: number };
	export let allLineData: any;
	export let xDots: any;
	export let legs: any;

	export let sidebarWidth: number;

	let timeout: NodeJS.Timeout | null = null;

	let svgElement: any;

	function debounceUpdateLegs() {
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(() => {
			legs.update((legs) => {
				return legs;
			});
		}, 0);
	}

	function calculateXYRel(e: MouseEvent, innerElement: HTMLElement) {
		let xRel = (e.clientX - sidebarWidth) / innerElement.getBoundingClientRect().width;
		let yRel = e.clientY / innerElement.getBoundingClientRect().height;

		let xRange = $xMax - $xMin;
		let yRange = $yMax - $yMin;

		xRel = $xMin + xRange * xRel;
		yRel = $yMax - yRange * yRel;

		return { xRel, yRel };
	}

	onMount(() => {
		const innerElement = svgElement.$$.ctx[0] as unknown as HTMLElement;

		let isPanning = false;
		let panStartPos: PanPosition = { x: 0, y: 0 };

		innerElement.addEventListener('wheel', (e) => {
			xMin.update((xMin) => xMin + Math.round(e.deltaY * 0.015));
			xMax.update((xMax) => xMax - Math.round(e.deltaY * 0.015));
			yMin.update((yMin) => yMin + Math.round(e.deltaY * 0.015));
			yMax.update((yMax) => yMax - Math.round(e.deltaY * 0.015));

			debounceUpdateLegs();
		});

		innerElement.addEventListener('mousedown', ({ clientX, clientY }) => {
			isPanning = true;
			panStartPos = { x: clientX, y: clientY };
		});

		innerElement.addEventListener('mousemove', handleMouseMove);
		innerElement.addEventListener('mouseup', handleMouseUp);

		function handleMouseMove(e: MouseEvent) {
			const { xRel, yRel } = calculateXYRel(e, innerElement);

			let newPanEndPosRel: PanPositionRel = {
				x: xRel,
				y: yRel,
				xAbs: e.clientX - 365,
				yAbs: e.clientY
			};

			panEndPosRel.set(newPanEndPosRel);

			let newXDots: XDotsData[] = [];
			for (let line of $allLineData) {
				let leg = line.leg;
				const value =
					getValueAtPrice(leg.strike, xRel, leg.kind, leg.buySell) +
					(leg.buySell === 'SELL' ? +leg.price : -leg.price);
				const valueScaled = value * leg.quantity;

				newXDots.push({ x: xRel, y: valueScaled, lineColor: leg.lineColor });
			}

			const sumOfCurrentPos = newXDots.reduce((acc, item) => {
				const toAdd = isNaN(item.y) ? 0 : item.y;
				return acc + toAdd;
			}, 0);

			newXDots[newXDots.length - 1].y = sumOfCurrentPos;
			xDots.set(newXDots);

			if (isPanning) {
				let panEndPos: PanPosition = { x: e.clientX, y: e.clientY };

				let panDiff = {
					x: panEndPos.x - panStartPos.x,
					y: panEndPos.y - panStartPos.y
				};

				xMin.update((xMin) => xMin - Math.round(panDiff.x * 0.125));
				xMax.update((xMax) => xMax - Math.round(panDiff.x * 0.125));
				yMin.update((yMin) => yMin + Math.round(panDiff.y * 0.075));
				yMax.update((yMax) => yMax + Math.round(panDiff.y * 0.075));

				panStartPos = { x: e.clientX, y: e.clientY };

				debounceUpdateLegs();
			}
		}

		function handleMouseUp(e: MouseEvent) {
			isPanning = false;
		}
	});

	// gets a slightly lighter color than the hex provided
	const getColorOffset = (hex: string) => {
		let r = parseInt(hex.slice(1, 3), 16);
		let g = parseInt(hex.slice(3, 5), 16);
		let b = parseInt(hex.slice(5, 7), 16);

		r = Math.round((r * 1.2 + 255) / 2);
		g = Math.round((g * 1.2 + 255) / 2);
		b = Math.round((b * 1.2 + 255) / 2);

		r = r.toString(16).length === 1 ? '0' + r.toString(16) : r.toString(16);
		g = g.toString(16).length === 1 ? '0' + g.toString(16) : g.toString(16);
		b = b.toString(16).length === 1 ? '0' + b.toString(16) : b.toString(16);

		return '#' + r + g + b;
	};
</script>

<LayerCake
	padding={{ top: 8, right: 10, bottom: 20, left: 25 }}
	x={xKey}
	y={yKey}
	yDomain={[$yMin, $yMax]}
	xDomain={[$xMin, $xMax]}
	data={$data}
>
	<Svg bind:this={svgElement}>
		<AxisX ticks={6} />
		<AxisY ticks={6} />

		<Line
			stroke="#555"
			_data={[
				{ x: $xMin, y: 0 },
				{ x: $xMax, y: 0 }
			]}
		/>

		<Line
			stroke="#555"
			_data={[
				{ x: 0, y: $yMin },
				{ x: 0, y: $yMax }
			]}
		/>

		{#each $allLineData as item}
			{#if item.leg.showOnChart}
				<Line
					_data={item.line}
					stroke={item.leg.lineColor}
					strokeWidth={item.leg.spotlight ? 10 : 2}
				/>
			{/if}
		{/each}

		<Line
			stroke="#888"
			strokeWidth={2}
			_data={[
				{ x: $xMin, y: 0 },
				{ x: $xMax, y: 0 }
			]}
		/>

		<!-- y=0 intercept lines -->
		{#each $allLineData as item}
			{#each item.intersections as intersection}
				{#if item.leg.showZeroIntersection}
					<Line
						stroke={item.leg.lineColor}
						strokeWidth={2}
						_data={[
							{ x: intersection.x, y: $yMin },
							{ x: intersection.x, y: $yMax }
						]}
					/>
				{/if}
			{/each}
		{/each}

		<Line
			stroke="#2d333b"
			_data={[
				{ x: $xMin, y: $panEndPosRel.y },
				{ x: $xMax, y: $panEndPosRel.y }
			]}
		/>

		<Line
			stroke="#2d333b"
			_data={[
				{ x: $panEndPosRel.x, y: $yMin },
				{ x: $panEndPosRel.x, y: $yMax }
			]}
		/>

		{#each $xDots as dot}
			<Circle x={dot.x} y={dot.y} r={4} stroke={'#DDD'} fill={dot.lineColor} strokeWidth={1} />
		{/each}

		<Circle
			x={$panEndPosRel.x}
			y={$panEndPosRel.y}
			r={1}
			stroke={'#e91e63'}
			fill={'#e91e63'}
			strokeWidth={1}
		/>
	</Svg>
</LayerCake>
