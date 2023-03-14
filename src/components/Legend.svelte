<script lang="ts">
	export let xMin: number;
	export let xMax: number;
	export let yMin: number;
	export let yMax: number;
	export let panEndPosRel: { x: number; y: number };
	export let allLineData: any;
	export let xDots: any;
</script>

<!-- <div>
	<div
		style="top: 80px; right: 30px;"
		class={`absolute flex w-[200px] h-[36px] font-bold bg-gray-900 text-gray-500 text-sm px-3 py-2 text-left rounded-md`}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6 ml-2 mr-6"
			fill={'#FFF'}
			viewBox="0 0 24 24"
			stroke={'#FFF'}
		>
			<circle cx="12" cy="12" r="10" />
		</svg>
		({$panEndPosRel.x.toFixed(2)}, {$panEndPosRel.y.toFixed(2)})
	</div>
</div> -->

<div
	style="top: {90}px; left: {30}px;"
	class={`absolute flex w-[200px] h-[40px] font-bold bg-[#2d333b] text-sm px-3 py-2 text-left rounded-md shadow-md`}
>
	<input
		type="text"
		placeholder={$panEndPosRel.x.toFixed(2)}
		class="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
	/>
	<input
		type="text"
		placeholder={$panEndPosRel.y.toFixed(2)}
		class="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
	/>
</div>

{#each $xDots as dot, dotIndex}
	<div
		style="top: {90 + dotIndex * 50}px; right: {30}px;"
		class={`absolute flex w-[200px] h-[36px] font-bold bg-[#2d333b] text-gray-500 text-sm px-3 py-2 text-left rounded-md shadow-md`}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6 ml-2 mr-6"
			fill={dot.lineColor}
			viewBox="0 0 24 24"
			stroke={dot.lineColor}
		>
			<circle cx="12" cy="12" r="10" />
		</svg>

		({dot.x.toFixed(2)}, {dot.y.toFixed(2)})
	</div>
{/each}
