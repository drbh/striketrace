<script lang="ts">
	import { draggable } from '@neodrag/svelte';
	import { ChevronDown, ChevronUp, Icon } from 'svelte-hero-icons';

	export let showStats: any;
	export let legs: any;

	export let sidebarWidth = 300;
</script>

<div use:draggable>
	<div
		style={`transform: translate(calc(100vw - ${sidebarWidth}px - 300px), -20vh);`}
		class={`absolute w-[260px] ${
			$showStats ? 'h-[190px]' : 'h-[50px]'
		} bg-[#2d333b] text-gray-700 text-sm p-2 rounded-md`}
	>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			class="p-1.5 flex items-center rounded-md px-4 duration-300 cursor-pointer text-white"
			style="display: flex; justify-content: space-between;"
			on:click={() => showStats.set(!showStats)}
		>
			Statistics
			<Icon src={$showStats ? ChevronDown : ChevronUp} class="h-6 w-6 ml-2" />
		</div>
		{#if $showStats}
			<div class="my-2 bg-gray-600 h-[1px]" />

			<div
				class="flex rounded-md px-2 text-white pb-1"
				style="display: flex; justify-content: space-between;"
			>
				<span class="text-sm font-bold">Total Equity Cost</span>
				<span class="text-sm text-gray-200 font-bold ml-4"> $0 </span>
			</div>

			<div
				class="flex rounded-md px-2 text-white pb-1"
				style="display: flex; justify-content: space-between;"
			>
				<span class="text-sm font-bold">Sum Short</span>
				<span class="text-sm text-gray-200 font-bold ml-4">
					${$legs
						.map((leg) => (leg.buySell === 'SELL' ? leg.price * leg.quantity : 0))
						.reduce((a, b) => a + b, 0) * 100}</span
				>
			</div>

			<div
				class="flex rounded-md px-2 text-white pb-1"
				style="display: flex; justify-content: space-between;"
			>
				<span class="text-sm font-bold">Sum Long</span>
				<span class="text-sm text-gray-200 font-bold ml-4">
					${(
						$legs
							.map((leg) => (leg.buySell === 'BUY' ? leg.price * leg.quantity : 0))
							.reduce((a, b) => a + b, 0) * 100
					).toFixed(4)}</span
				>
			</div>

			<div
				class="flex rounded-md px-2 text-white pb-1"
				style="display: flex; justify-content: space-between;"
			>
				<span class="text-sm font-bold">Out of pocket</span>
				<span class="text-sm text-gray-200 font-bold ml-4"
					>${(
						($legs
							.map((leg) => (leg.buySell === 'SELL' ? leg.price * leg.quantity : 0))
							.reduce((a, b) => a + b, 0) -
							$legs
								.map((leg) => (leg.buySell === 'BUY' ? leg.price * leg.quantity : 0))
								.reduce((a, b) => a + b, 0)) *
						100
					).toFixed(4)}</span
				>
			</div>
		{/if}
	</div>
</div>
