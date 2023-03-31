<!--
  @component
 -->
<script lang="ts">
	// import { onMount } from 'svelte';

	import Leg from './Leg.svelte';
	import { Icon, WrenchScrewdriver } from 'svelte-hero-icons';

	export let legs = [];
	export let allLineData = any;
	export let xMin = 0;
	export let xMax = 0;
	export let yMin = 0;
	export let yMax = 0;
	export let panEndPosRel = { x: 0, y: 0 };
	export let entryValue = '';
	export let obj = {
		kind: '',
		strike: '',
		buySell: '',
		quantity: '',
		price: ''
	};

	export let handleEntryKey = () => {};
	export let handleOnAddLeg = () => {};
	export let handleOnChangeShowZeroIntersection = () => {};
	export let handleOnChangeShowOnChart = () => {};
	export let handleOnChageSpotlight = () => {};
	export let handleOnRemoveLegAtIndex = () => {};
	export let sidebarWidth = 200;
	let isEditMode = false;
</script>

<div
	class="sidebar fixed top-16 bottom-0 lg:left-0 p-2 overflow-y-auto text-center bg-[#22272e] border-r border-gray-700"
	style={`width: ${sidebarWidth}px;`}
>
	<div
		class="mt-6 p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white"
	>
		<i class="bi bi-search text-sm" />
		<input
			type="text"
			placeholder="Type 'C' or 'P' to enter a CALL or PUT"
			class="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
			on:keypress={(event) => handleEntryKey({ obj, entryValue, event })}
			bind:value={$entryValue}
		/>
	</div>
	<div class="p-2.5 flex items-center rounded-md px-0">
		<i class="bi bi-search text-sm" />

		<ul
			class="mb-2 mx-0 px-0 flex list-none flex-col flex-wrap pl-0 md:flex-row w-full"
			role="tablist"
			data-te-nav-ref
		>
			{#if $obj.kind}
				<li role="presentation" class="mr-2">
					<span
						class="block rounded bg-green-600 px-3 py-2 text-xs font-medium uppercase"
						aria-selected="true">{$obj.kind}</span
					>
				</li>
			{/if}

			{#if $obj.strike}
				<li role="presentation" class="mr-2">
					<span
						class="block rounded bg-blue-600 px-3 py-2 text-xs font-medium uppercase"
						aria-selected="true">{$obj.strike}</span
					>
				</li>
			{/if}

			{#if $obj.buySell}
				<li role="presentation" class="mr-2">
					<span
						class="block rounded bg-orange-600 px-3 py-2 text-xs font-medium uppercase"
						aria-selected="true">{$obj.buySell}</span
					>
				</li>
			{/if}

			{#if $obj.quantity}
				<li role="presentation" class="mr-2">
					<span
						class="block rounded bg-pink-600 px-3 py-2 text-xs font-medium uppercase"
						aria-selected="true">{$obj.quantity}</span
					>
				</li>
			{/if}

			{#if $obj.price}
				<li role="presentation" class="mr-2">
					<span
						class="block rounded bg-purple-600 px-3 py-2 text-xs font-medium uppercase"
						aria-selected="true">{$obj.price}</span
					>
				</li>
			{/if}
		</ul>
	</div>

	<div class="p-2.5 mt-1 flex items-center rounded-md px-2 duration-300 text-gray-500">
		{#if $obj.kind && $obj.strike && $obj.buySell && $obj.quantity && $obj.price}
			<button
				class="block rounded px-3 py-2 text-xs font-medium uppercase w-full bg-green-600 text-white"
				aria-selected="true"
				on:click={() => handleOnAddLeg(obj)}
			>
				Add‰
			</button>
		{/if}
	</div>
	<div class="p-2.5 mt-3 flex items-center rounded-md px-2 duration-300 text-gray-500">
		<i class="bi bi-house-door-fill" />

		<div class="flex items-center direction-row space-between justify-between w-full">
			<div class="text-[15px] mr-4 font-bold">Legs</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div
				class="cursor-pointer"
				on:click={() => {
					isEditMode = !isEditMode;
				}}
			>
				<Icon
					src={WrenchScrewdriver}
					class="w-4 h-4"
					style={`color: ${isEditMode ? '#AAA' : '#444'}`}
				/>
			</div>
		</div>
	</div>

	{#if legs.length === 0}
		<div class="p-2.5 mt-3 flex items-center rounded-md px-2 duration-300 text-gray-500">
			<i class="bi bi-house-door-fill" />
			<span class="text-[15px] ml-4 font-bold">No Legs</span>
		</div>
	{/if}

	<!-- for each item in the leg array -->
	{#each $legs as leg, legIndex}
		<Leg
			{legIndex}
			onChangeShowZeroIntersection={(showZeroIntersection) =>
				handleOnChangeShowZeroIntersection(showZeroIntersection, leg)}
			onChangeShowOnChart={(showOnChart) => handleOnChangeShowOnChart(showOnChart, leg)}
			onChangeSpotlight={(spotlight) => handleOnChageSpotlight(spotlight, leg)}
			onRemoveLegAtIndex={() => handleOnRemoveLegAtIndex(legIndex)}
			showZeroIntersection={leg.showZeroIntersection}
			showOnChart={leg.showOnChart}
			spotlight={leg.spotlight}
			kind={leg.kind}
			buySell={leg.buySell}
			strike={leg.strike}
			price={leg.price}
			quantity={leg.quantity}
			lineColor={leg.lineColor}
			intersections={$allLineData[legIndex].intersections || []}
			{isEditMode}
		/>
	{/each}
</div>
