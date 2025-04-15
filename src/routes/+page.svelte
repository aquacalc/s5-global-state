<script>
	import { myCounter, Heading, Select, Navbar } from '$lib';
</script>

<!-- <section class="mx-auto my-0 max-w-3xl text-center"> -->
<section class="mx-0 my-0 text-center">
	<Heading />
	<!-- <h1 class="font-bold">Welcome to...Global State in Svelte 5</h1> -->

	<h2>The count is {myCounter.value} ({myCounter.square})</h2>

	<Select />

	<div class="mx-3 flex gap-1.5">
		<button
			class="shrink grow basis-0 bg-blue-400 py-8 text-white hover:bg-blue-500"
			onclick={myCounter.increment}
		>
			Increment
		</button>

		<button
			class="shrink grow basis-0 bg-green-400 py-8 text-white hover:bg-green-500"
			onclick={myCounter.decrement}
		>
			Decrement
		</button>

		<button
			class="shrink grow basis-0 bg-orange-400 py-8 text-white hover:bg-orange-500"
			onclick={myCounter.reset}
		>
			Reset
		</button>
	</div>
</section>

<hr />
<!-- 
<style>
	section {
		background-color: #f8f8f8;
		border-radius: 1rem;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		padding: 2em;

		/* see: 8'12" https://www.youtube.com/watch?v=2IV08sP9m3U */
		height: 100vh; /* for browser compatibility (if no support for dvh) */
		height: 100dvh;

		width: 100vw;
		border: 15px solid #f3a617;
	}

	button {
		/* padding: 0.5em 1em; */
		padding-top: 0.75em;
		padding-bottom: 0.75em;
		margin: 0.5em;
		border-radius: 0.5em;
		cursor: pointer;
	}
</style> -->
