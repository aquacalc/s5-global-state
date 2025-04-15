<script>
	let { data } = $props();
</script>

<h1>This is Route Three</h1>

<svelte:head>
	<title>{data.posts[0].title}</title>
</svelte:head>

<!-- <p class="date">{formatDate(post.date)}</p> -->


<section>
	<ul class="posts">
		{#each data.posts as post}
			<li class="post">
				<a href={post.slug} class="title">{post.title}</a>
				<p class="description">{post.description}</p>
			</li>
		{/each}
	</ul>
</section>

<!-- <style>
	.posts {
		display: grid;
		gap: var(--size-7);

		.post {
			max-inline-size: var(--size-content-3);

			&:not(:last-child) {
				border-bottom: 1px solid var(--border);
				padding-bottom: var(--size-7);
			}

			.title {
				font-size: var(--font-size-fluid-3);
				text-transform: capitalize;
			}

			/* .date {
				color: var(--text-2);
			} */

			.description {
				margin-top: var(--size-3);
			}
		}
	}
</style> -->
