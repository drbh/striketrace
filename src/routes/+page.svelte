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

	const sidebarWidth = 300;
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
		{sidebarWidth}
	/>

	<div
		class="content bg-[#22272e] fixed top-0 bottom-0 p-2 overflow-y-auto text-center bg-white-900"
		style={`width: calc(100% - ${sidebarWidth}px);  cursor: none; overflow: hidden; left: ${sidebarWidth}px;`}
	>
		<DrawingWindow
			{legs}
			{xMin}
			{xMax}
			{yMin}
			{yMax}
			{panEndPosRel}
			{allLineData}
			{xDots}
			{sidebarWidth}
		/>

		<Legend {xMin} {xMax} {yMin} {yMax} {panEndPosRel} {allLineData} {xDots} />

		<Statstics {showStats} {legs} />
	</div>
</body>
