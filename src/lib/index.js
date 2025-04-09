// place files you want to import through the `$lib` alias in this folder.
// src/lib/index.js
import { myCounter } from './state/Counter.svelte.js';
import Heading from './components/Heading.svelte';
import Select from './components/CustomSelect.svelte';
import Navbar from './components/Navbar.svelte';

export { Navbar, myCounter, Heading, Select };
