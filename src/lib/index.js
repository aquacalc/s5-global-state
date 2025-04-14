// place files you want to import through the `$lib` alias in this folder.
// src/lib/index.js
import { myCounter } from './state/Counter.svelte.js';
import Heading from './components/Heading.svelte';
import Select from './components/CustomSelect.svelte';
import Navbar from './components/Navbar.svelte';
import SocialIcons from './components/SocialIcons.svelte';
import BestPractices from './markdown/best-practices.md';

export { Navbar, myCounter, Heading, Select, SocialIcons, BestPractices };
