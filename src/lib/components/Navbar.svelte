<script>
	import { onMount } from 'svelte';

	let media;

	const updateNavbar = (e) => {
		const isMobile700px = e.matches;

		// console.log('isMobile700px: ', isMobile700px);

		if (isMobile700px) {
			// If the screen is less than 700px, set the inert attribute to true
			// to prevent screen readers from reading the content of the nav
			document.querySelector('nav').setAttribute('inert', '');
		} else {
			document.querySelector('nav').removeAttribute('inert');
		}
	};

	const openSidebar = () => {
		document.querySelector('nav').classList.add('show');
		document.querySelector('#open-sidebar-btn').setAttribute('aria-expanded', 'true');
		document.querySelector('nav').removeAttribute('inert');
	};
	const closeSidebar = () => {
		document.querySelector('nav').classList.remove('show');
		document.querySelector('#open-sidebar-btn').setAttribute('aria-expanded', 'false');
		document.querySelector('nav').setAttribute('inert', '');
	};

	onMount(() => {
		// Access `window` safely here
		media = window.matchMedia('(width < 700px)');

		// Listen for changes to the media query
		media.addEventListener('change', (e) => updateNavbar(e));

		// Call the function once (on page load) to set the initial state
		updateNavbar(media);

		// Cleanup event listener when the component is destroyed
		return () => {
			media.removeEventListener('change', updateNavbar);
		};
	});
</script>

<!-- <script>
	const media = window.matchMedia('(width < 700px)');

	// Listen for changes to the media query
	media.addEventListener('change', (e) => updateNavbar(e));

	const updateNavbar = (e) => {
		const isMobile700px = e.matches;

    console.log('isMobile700px: ', isMobile700px);

		if (isMobile700px) {
			// If the screen is less than 700px, set the inert attribute to true
			// to prevent screen readers from reading the content of the nav
			document.querySelector('nav').setAttribute('inert', 'true');
		} else {
			document.querySelector('nav').setAttribute('inert');
		}
	};

	const openSidebar = () => {
		document.querySelector('nav').classList.add('show');
		document.querySelector('#open-sidebar-btn').setAttribute('aria-expanded', 'true');
	};
	const closeSidebar = () => {
		document.querySelector('nav').classList.remove('show');
		document.querySelector('#open-sidebar-btn').setAttribute('aria-expanded', 'false');
	};

	// Call the function once (on page load) to set the initial state
	updateNavbar(media);
</script> -->

<button
	id="open-sidebar-btn"
	onclick={openSidebar}
	aria-label="Open sidebar"
	aria-expanded="false"
	aria-controls="navigation sidebar"
	>O
</button>

<nav class="show">
	<ul>
		<li>
			<button id="close-sidebar-btn" onclick={closeSidebar} aria-label="Close sidebar">X</button>
		</li>
		<li class="home-li">
			<a class="active-link" aria-current="page" href="/">Home </a>
		</li>
		<li><a href="/route-one">Route One</a></li>
		<li><a href="/route-two">Route Two</a></li>
		<li><a href="/route-three">Route Three</a></li>
		<li><a class="accent-link" href="/login">Login</a></li>
	</ul>
</nav>

<div id="overlay" role="button" aria-hidden="true" onclick={closeSidebar}></div>

<style>
	nav {
		background-color: var(--primary-color);
		border-bottom: 1px solid var(--hover-color);
	}

	nav ul {
		list-style-type: none;
		display: flex;
	}

	nav .home-li {
		margin-right: auto;
	}

	nav li {
		display: flex;
	}

	nav a {
		display: flex;
		color: var(--text-color);
		text-decoration: none;
		padding: 1em 2em;
		transition: background-color 150ms ease;
	}

	nav a:hover {
		background-color: var(--hover-color);
	}

	nav a.active-link {
		border-bottom: 2px solid var(--text-color);
	}

	nav a.accent-link {
		/* border-bottom: 2px solid var(--accent-color); */
		background-color: var(--accent-color);
	}

	#open-sidebar-btn {
		display: none;
		background: none;
		border: none;
		padding: 0.5em 1em;
		margin-left: auto;
		border-radius: 0.5em;
		cursor: pointer;
	}

	#close-sidebar-btn {
		display: none;
		background: none;
		border: none;
		padding: 0.5em 1em;
		border-radius: 0.5em;
		cursor: pointer;
	}

	#overlay {
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		inset: 0;
		z-index: 9;
		display: none;
	}

	.skip-link {
		opacity: 0;
		pointer-events: none;
		position: absolute;
		top: 10px;
		left: 10px;
		z-index: 1000;
		background-color: var(--accent-color);
		color: #ffffff;
		padding: 12px 24px;
		border-radius: 5px;
		text-decoration: none;
		font-weight: bold;
		font-size: 1rem;
		transition: opacity 0.3s ease;
	}

	.skip-link:focus {
		opacity: 1;
		pointer-events: auto;
		outline: 3px solid #ffffff;
	}

	@media screen and (max-width: 700px) {
		#open-sidebar-btn,
		#close-sidebar-btn {
			display: block;
		}

		nav {
			position: fixed;
			top: 0;
			right: -100%;
			height: 100vh;
			width: min(15em, 100%);
			z-index: 10;
			border-left: 1px solid var(--hover-color);
			transition: right 300ms ease-out;
		}

		nav.show {
			right: 0;
		}

		/* SIBLING Selector */
		nav.show ~ #overlay {
			display: block;
		}

		nav ul {
			width: 100%;
			flex-direction: column;
			/* padding: 1em;
      gap: 1em; */
		}

		nav a {
			width: 100%;
			padding-left: 2.5em;
		}

		nav a:active-link {
			border-bottom: none;
		}

		nav .home-li {
			margin-right: unset;
		}
	}
</style>
