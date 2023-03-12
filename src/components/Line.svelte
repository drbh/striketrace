<!--
  @component
  Generates an SVG area shape using the `area` function from [d3-shape](https://github.com/d3/d3-shape).
 -->
<script lang="ts">
	import { getContext } from 'svelte';

	const { data, xGet, yGet } = getContext('LayerCake') as any;

	/** @type {String} [stroke='#ab00d6'] - The shape's fill color. This is technically optional because it comes with a default value but you'll likely want to replace it with your own color. */
	export let stroke = '#ab00d6';

	export let _data: any[] = [];

	export let strokeWidth = 1;

	$: path =
		'M' +
		$data
			.map((d: any) => {
				return $xGet(d) + ',' + $yGet(d);
			})
			.join('L');
</script>

{#if _data.length > 0}
	<path
		class="path-line"
		style="stroke-width: {strokeWidth};"
		d={'M' +
			_data
				.map((d) => {
					return $xGet(d) + ',' + $yGet(d);
				})
				.join('L')}
		{stroke}
	/>
{/if}

{#if _data.length == 0}
	<path
		class="path-line"
		style="stroke-linejoin:round; stroke-width: {strokeWidth};"
		d={path}
		{stroke}
	/>
{/if}

<style>
	.path-line {
		fill: none;
		stroke-linejoin: round;
		stroke-linecap: round;
		/* stroke-width: 2; */
	}
</style>
