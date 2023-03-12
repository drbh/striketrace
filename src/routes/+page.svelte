<script lang="ts">
	// @ts-nocheck
	import DrawingWindow from '../components/DrawingWindow.svelte';
	import Legend from '../components/Legend.svelte';
	import Navbar from '../components/Navbar.svelte';
	import Sidebar from '../components/Sidebar.svelte';
	import Statstics from '../components/Statstics.svelte';
	import { handleEntryKey } from '../logic/entry';
	import { entryValue, obj } from '../stores/entry';
	import {
		allLineData,
		handleOnAddLeg,
		handleOnChageSpotlight,
		// actions that change state
		handleOnChangeShowOnChart,
		handleOnRemoveLegAtIndex,
		legs,
		panEndPosRel,
		showStats,
		xDots,
		xMax,
		xMin,
		yMax,
		yMin
	} from '../stores/legs';
</script>

<body class="bg-gray-800">
	<Navbar />

	<Sidebar
		{legs}
		{xMin}
		{xMax}
		{yMin}
		{yMax}
		{panEndPosRel}
		{entryValue}
		{obj}
		{handleEntryKey}
		{handleOnAddLeg}
		{handleOnChangeShowOnChart}
		{handleOnChageSpotlight}
		{handleOnRemoveLegAtIndex}
	/>

	<div
		class="content bg-gray-800 fixed top-0 bottom-0 left-[360px] p-2 overflow-y-auto text-center bg-white-900"
		style={`width: calc(100% - 360px);  cursor: none; overflow: hidden;`}
	>
		<DrawingWindow {legs} {xMin} {xMax} {yMin} {yMax} {panEndPosRel} {allLineData} {xDots} />

		<Legend {xMin} {xMax} {yMin} {yMax} {panEndPosRel} {allLineData} {xDots} />

		<Statstics {showStats} {legs} />
	</div>
</body>
