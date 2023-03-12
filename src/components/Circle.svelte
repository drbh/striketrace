<!--
  @component
  Generates an SVG area shape using the `area` function from [d3-shape](https://github.com/d3/d3-shape).
 -->
<script>
	/** @type {String} [stroke='#ab00d6'] - The shape's fill color. This is technically optional because it comes with a default value but you'll likely want to replace it with your own color. */

	import { getContext } from 'svelte';
	const { data, xGet, yGet } = getContext('LayerCake');

	export let x = 1000;
	export let y = 100;
	export let r = 0;
	export let fill = 'none';
	export let stroke = '#ab00d6';
	export let strokeWidth = 3;
</script>

<circle cx={$xGet({ x })} cy={$yGet({ y })} {r} {fill} {stroke} stroke-width={strokeWidth} />

<style>
</style>
