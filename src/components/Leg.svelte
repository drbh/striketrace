<!--
  @component
 -->
<script lang="ts">
	import { getContext } from 'svelte';
	import {
		Icon,
		ArrowUp,
		ChevronDown,
		ChevronUp,
		Eye,
		EyeSlash,
		XMark,
		MagnifyingGlassPlus,
		PaintBrush,
		WrenchScrewdriver,
		ArrowTrendingUp,
		ArrowTrendingDown
	} from 'svelte-hero-icons';

	let show = false;
	export let showOnChart = true;
	export let spotlight = false;

	export let isEditMode = false;
	export let legIndex = 0;
	export let kind = 'call';
	export let buySell = 'short';
	export let strike = 60;
	export let price = 1.4;
	export let quantity = 1;
	export let lineColor = 'red';
	export let onChangeShowOnChart = (showOnChart: boolean) => {};
	export let onChangeSpotlight = (spotlight: boolean) => {};
	export let onRemoveLegAtIndex = (legIndex: any) => {};
</script>

<div>
	<div
		class="mt-3 flex items-center rounded-md px-0 duration-300 text-white border border-gray-700"
	>
		<i class="bi bi-house-door-fill" />

		<div
			class="p-1.5 flex items-center rounded-md px-2 duration-300 text-white text-left w-full"
			style={`display: flex; justify-content: space-between; border-left: 10px solid ${lineColor};`}
		>
			<!-- a card that has large text with small under it -->
			<div class="flex items-center text-left disable-text-selection">
				<div>
					<div class="text-xl text-gray-400">${strike}</div>

					<div class="text-sm text-gray-400 justify-between">
						<div class="flex direction-row">
							<div class="flex direction-row h-4 text-gray-500">
								{kind === 'CALL' ? 'C' : 'P'}
								<Icon
									class="h-4 pl-2"
									src={kind === 'CALL' ? ArrowTrendingUp : ArrowTrendingDown}
								/>
							</div>
						</div>

						<div class="flex items-center direction-row space-between justify-between w-full">
							<div class="pr-2">{quantity}</div>
							<div>{buySell == 'BUY' ? '-' : '+'}{price}</div>
						</div>
					</div>
				</div>
			</div>

			{#if isEditMode}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="flex items-center">
					<div class={`h-4 pl-2 ${showOnChart ? 'text-white' : 'text-gray-500'}`}>
						<Icon src={PaintBrush} color={lineColor} />
					</div>
					<div
						class={`h-4 pl-2 ${showOnChart ? 'text-white' : 'text-gray-500'}`}
						on:click={() => onChangeShowOnChart(!showOnChart)}
					>
						<Icon src={showOnChart ? Eye : EyeSlash} />
					</div>

					<div
						class={`h-4 pl-2 ${spotlight ? 'text-white' : 'text-gray-500'}`}
						on:click={() => onChangeSpotlight(!spotlight)}
					>
						<Icon src={MagnifyingGlassPlus} />
					</div>

					<div class="h-4 pl-2" on:click={() => (show = !show)}>
						<Icon src={show ? ChevronUp : ChevronDown} />
					</div>
				</div>
			{/if}

			{#if !isEditMode}
				<div class="flex items-center">
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="h-6 pr-0 text-gray-400 cursor-pointer" on:click={onRemoveLegAtIndex}>
						<Icon src={XMark} />
					</div>
				</div>
			{/if}
		</div>
	</div>

	{#if show}
		<div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 text-white">
			<i class="bi bi-house-door-fill" />

			<table class="table-auto w-full">
				<tr>
					<td class="text-left text-sm text-gray-600 font-bold">Type</td>
					<td class="text-right text-sm text-gray-200 font-bold ml-4">{kind}</td>
				</tr>
				<tr>
					<td class="text-left text-sm text-gray-600 font-bold">Direction</td>
					<td class="text-right text-sm text-gray-200 font-bold ml-4">{buySell}</td>
				</tr>
				<tr>
					<td class="text-left text-sm text-gray-600 font-bold">Strike</td>
					<td class="text-right text-sm text-gray-200 font-bold ml-4">{strike}</td>
				</tr>
				<tr>
					<td class="text-left text-sm text-gray-600 font-bold">Price</td>
					<td class="text-right text-sm text-gray-200 font-bold ml-4">{price}</td>
				</tr>
				<tr>
					<td class="text-left text-sm text-gray-600 font-bold">Quantity</td>
					<td class="text-right text-sm text-gray-200 font-bold ml-4">{quantity}</td>
				</tr>
				<tr>
					<td class="text-left text-sm text-gray-600 font-bold">Delta</td>
					<td class="text-right text-sm text-gray-200 font-bold ml-4">0.4</td>
				</tr>
				<tr>
					<td class="text-left text-sm text-gray-600 font-bold">Gamma</td>
					<td class="text-right text-sm text-gray-200 font-bold ml-4">0.2</td>
				</tr>
			</table>
		</div>
	{/if}
</div>

<style>
	.path-line {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2;
	}

	.disable-text-selection {
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
</style>
