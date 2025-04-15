<script>
	let { data } = $props();
	// console.log('DATA: ', data.metadata.title);
</script>

<svelte:head>
	<title>{data.metadata.title}</title>

	<title>{data.metadata.title}</title>
	<metadata property="og:type" content="article" />
	<metadata property="og:title" content={data.metadata.title} />
</svelte:head>

<article>
	<hgroup>
		<h1>{data.metadata.title}</h1>
		<!-- <p>Published at {formatDate(data.metadata.date)}</p> -->
	</hgroup>

	<div class="tags">
		{#each data.metadata.categories as category}
			<span class="surface-4">&num;{category}</span>&nbsp;
		{/each}
	</div>

	<hr />
</article>

<data.content />

<style>
	article {
		background-color: antiquewhite;
		max-inline-size: var(--size-content-3);
		margin-inline: auto;

		/* h1 {
			text-transform: capitalize;
		}

		h1 + p {
			margin-top: var(--size-2);
			color: var(--text-2);
		} */

		.tags {
			display: flex;
			gap: var(--size-3);
			margin-top: var(--size-7);

			> * {
				padding: var(--size-2) var(--size-3);
				border-radius: var(--radius-round);
			}
		}
	}
</style>
