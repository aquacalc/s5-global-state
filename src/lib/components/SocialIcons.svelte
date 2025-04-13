<script>
	const MyGuyBri = `My Guy Bri\'s`;

	// Define reusable data for social links
	const socialLinks = [
		{
			name: 'X',
			url: 'https://x.com/codingtogo',
			color: '#000',
			icon: `<svg style='height: 1.95rem' role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <title>X</title>
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
            </svg>`
		},
		{
			name: 'YouTube',
			url: 'https://youtube.com/@codingtogo',
			color: 'red',
			icon: `<svg style='height: 1.95rem' role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <title>YouTube</title>
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>`
			
		}
	];
</script>

<a href="https://www.youtube.com/watch?v=UQKWc2r_41U" target="_blank" rel="noopener noreferrer">
	<h3 class="text-xl text-blue-700">see: https://www.youtube.com/watch?v=UQKWc2r_41U</h3>
</a>

<h1 class="text-2xl font-bold text-blue-500">Welcome to {MyGuyBri} Tooltip Icons</h1>

<div class="socials-container">
	<a href="https://x.com/codingtogo" data-social={`${MyGuyBri} X`} style="--accent-color: #000;">
		<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
			><title>My Guy Bri's X</title><path
				d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
			/></svg
		>
	</a>
	<a
		href="https://youtube.com/@codingtogo"
		data-social={`${MyGuyBri} YouTube`}
		style="--accent-color: red;"
	>
		<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
			><title>YouTube</title><path
				d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
			/></svg
		>
	</a>
</div>

<!-- Social icons container -->
<div class="socials-container">
	{#each socialLinks as social}
		<a
			href={social.url}
			data-social={`My Guy Bri's ${social.name}`}
			style={`--accent-color: ${social.color};`}
		>
			<!-- <svg/> -->
				{@html social.icon}
			<!-- </svg> -->
		</a>
	{/each}
</div>

<style>
	.socials-container {
		display: flex;
		gap: 3.5rem;
		margin: 1rem;
	}
	.socials-container a {
		background-color: #f8f8f8;
		/* padding: 1em ; */
		border-radius: 50%;

		height: 3.5rem;
		width: 3.5rem;
		box-sizing: border-box;
		flex-shrink: 0;

		display: grid;
		place-items: center;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

		transition: color 0s ease;
	}
	.socials-container a:hover {
		background-color: var(--accent-color);
		fill: #fff;
	}

	.socials-container a svg {
		height: 1.95rem;
		transition: fill 0s ease;
	}
	.socials-container a svg:hover {
		/* fill: var(--hover-color); */
		fill: #fff;
	}

	.socials-container a::before {
		content: attr(data-social);
		position: absolute;
		background-color: var(--accent-color);
		color: rgb(246, 254, 188);
		text-decoration: none;
		font-size: 0.85rem;
		padding: 0.5em 1em;
		border-radius: 100px;
		box-shadow: 0 5px 10px rgba(0, 0, 0, 0.05);
		transform: translateY(-29px) rotate(25deg);
		opacity: 0;
		transition: 200ms cubic-bezier(0.42, 0, 0.44, 1.68);
	}
	.socials-container a:hover::before {
		opacity: 1;
		transform: translateY(-59px) rotate(0);
	}

	.socials-container a::after {
		content: '';
		position: absolute;
		height: 0;
		width: 0;
		border-left: 8px solid transparent;
		border-right: 8px solid transparent;
		border-top: 10px solid var(--accent-color);
		transform: translateY(-28px) rotate(25deg);
		opacity: 0;
		transition: 200ms cubic-bezier(0.42, 0, 0.44, 1.68);
	}
	.socials-container a:hover::after {
		opacity: 1;
		transform: translateY(-40px) rotate(0);
	}
</style>
