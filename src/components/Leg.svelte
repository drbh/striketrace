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
		PaintBrush
	} from 'svelte-hero-icons';

	let show = false;
	export let showOnChart = true;
	export let spotlight = false;

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
	<div class="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 text-white">
		<i class="bi bi-house-door-fill" />

		<div
			class="p-1.5 flex items-center rounded-md px-2 duration-300 text-white w-full"
			style="display: flex; justify-content: space-between;"
		>
			<div class="flex items-center">
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<div class="h-4 pr-0 text-gray-600" on:click={onRemoveLegAtIndex}>
					<Icon src={XMark} />
				</div>
			</div>

			<div
				class="p-1.5 flex items-center rounded-md px-2 duration-300 text-gray-400 w-[190px]"
				style="display: flex; justify-content: space-between;"
			>
				<div>{kind}</div>
				<div>${strike}</div>
				<div>{buySell}</div>
				<div>{quantity}</div>
				<div>${price}</div>
			</div>

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

				<!-- a svg for the eye icon -->
				<!-- <Icon src={Eye} class="h-4 text-white-500" solid /> -->

				<!-- <Icon src={EyeSlash} class="h-4 text-white-500" solid /> -->

				<!-- <Icon src={Trash} class="h-4 text-white-500" solid /> -->
			</div>
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
</style>
