<script>
	import { SocialIcons } from '$lib';
</script>

<h1>This is Route Two</h1>

<main>
	<SocialIcons />
</main>

<style>
	main {
    background-color: #d0cccc;
    border-radius: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 3em;
    margin: 1rem;

    /* see: 8'12" https://www.youtube.com/watch?v=2IV08sP9m3U */
    height: 100vh; /* for browser compatibility (if no support for dvh) */
    height: 100dvh;

    width: 100vw;
  }
</style>
