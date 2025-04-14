---
title: Best Practices
description: Best Practices description.
date: '2023-4-14'
categories:
  - sveltekit
  - svelte
published: true

slug: 'best-practices'
---

<!-- You are an expert in web development. You use Sveltekit as a framework, Tailwind for styling, and Supabase for the database layer.

Make sure that you are using the latest versions of each technology. 

For example, use Sveltekit 2.0 and Svelte 5 runes for components. 

If your training data does not extend to the documents for the latest version of Sveltekit and Svelte, you will find the necessary information at 

https://svelte.dev/docs/kit/introduction 
and 
https://svelte.dev/docs/svelte/what-are-runes

Generate a bullet list of best practices for using these technologies to build any app. -->


Okay, here is a bullet list of best practices for building modern web applications using the latest versions, specifically **SvelteKit 2.0 (with Svelte 5 Runes)**, **Tailwind CSS**, and **Supabase**, from an expert perspective:

**SvelteKit 2.0 & Svelte 5 Best Practices**

*   **Embrace Runes for Reactivity:**
    *   Use `$state()` for all reactive component-level state instead of `let`. This makes reactivity explicit and granular.
    *   Utilize `$derived()` for computed values derived from `$state` or `$props()`. It's efficient and declarative.
    *   Leverage `$effect()` for side effects that need to react to state changes (e.g., DOM manipulations not handled by Svelte, setting up/tearing down third-party libraries, logging). Remember to return cleanup functions from `$effect` where necessary (replaces `onDestroy` for many reactive cleanup tasks).
*   **Access Props with `$props()`:** Replace `export let propName` with accessing props via the `$props()` rune within your component's script.
*   **File-Based Routing Fundamentals:** Continue leveraging the `src/routes` structure: `+page.svelte` (UI), `+layout.svelte` (shared layouts), `+page.server.js` / `+layout.server.js` (server-only logic), `+server.js` (API routes).
*   **Master `load` Functions (Server vs. Universal):**
    *   **Server `load` (`+page.server.js`, `+layout.server.js`):** Essential for fetching data *securely* using Supabase server client (service role key), accessing private environment variables, and performing mutations before page load.
    *   **Universal `load` (`+page.js`, `+layout.js`):** Use for fetching public data, data from your *own* SvelteKit API routes, or logic needing to run on both server and client. Access data in components via `$props().data`.
    *   **Streaming & `defer`:** Utilize streamed responses in `load` for progressively loading data and improving perceived performance.
*   **Prefer Form Actions:** Use SvelteKit's Form Actions (`+page.server.js` actions) for data mutations (CUD operations). They provide progressive enhancement, simplified loading/error states (`$state` can track `form?.message` etc.), and keep mutation logic centralized on the server, close to your Supabase calls.
*   **State Management Strategy with Runes:**
    *   Local State: `$state()` within components.
    *   Shared State (Simple): Pass `$state` variables down as props (accessed via `$props()` in children).
    *   Shared State (Complex/Global): Create dedicated `.js`/`.ts` modules (`src/lib/stores/`) exporting `$state` variables or objects containing them. Import and use these reactive primitives directly in components. The traditional Svelte store contract (`subscribe`) also remains compatible if needed for interop. Use context API judiciously for deep state propagation.
*   **Component Structure (`src/lib`):** Organize reusable components, utilities, rune-based stores, types, etc., within `src/lib`. Keep components focused and composable.
*   **API Routes (`+server.js`):** Build dedicated API endpoints when needed (e.g., for webhooks, serving non-page data). Secure these appropriately, especially if interacting directly with Supabase.
*   **Error Handling:** Implement root and route-specific `+error.svelte` pages. Handle potential errors gracefully within `load` functions and Form Actions, returning appropriate status codes and data (e.g., `{ form }` object in actions).
*   **Environment Variables:** Strictly adhere to `$env/static/public` (build-time, client-safe) and `$env/dynamic/private` (runtime, server-only secrets like Supabase service key).
*   **Adapter Selection:** Choose the correct SvelteKit adapter (`adapter-auto`, `adapter-node`, `adapter-vercel`, etc.) matching your deployment platform.

**Tailwind CSS Best Practices**

*   **Strategic `tailwind.config.js`:** Define your design system (colors, fonts, spacing, breakpoints) in `tailwind.config.js` under `theme.extend`. Avoid arbitrary values in markup.
*   **Utility-First Predominance:** Apply utilities directly in your Svelte markup (`.svelte` files). This co-locates styling with structure.
*   **Component Abstraction via Svelte:** Create reusable UI patterns as Svelte components (`.svelte` files in `src/lib/components`). Pass Tailwind classes via props (potentially using helper functions or `clsx` library for conditional classes) or use slots.
*   **Minimize `@apply`:** Use `@apply` very sparingly, primarily within component `<style>` tags (`lang="postcss"`) for small, highly reusable base styles (like a base button look) *only* if prop-based class merging becomes overly complex. Avoid creating large CSS component blobs with it.
*   **Readability:** Format long class lists with line breaks (using Prettier with the Tailwind plugin helps automate sorting) or break complex elements into smaller, styled sub-components.
*   **Leverage Plugins:** Utilize official plugins like `@tailwindcss/typography`, `@tailwindcss/forms`, `@tailwindcss/aspect-ratio` for common patterns.
*   **Correct `content` Configuration:** Ensure the `content` array in `tailwind.config.js` correctly includes all file paths where Tailwind classes are used (`./src/**/*.{html,js,svelte,ts}`).

**Supabase Best Practices**

*   **Row Level Security (RLS) is Mandatory:** Enable RLS on *all* tables with potentially sensitive data. Write clear, robust policies based on `auth.uid()`, user roles, or other business logic. **RLS is your primary database security layer.**
*   **Distinct Supabase Clients:**
    *   **Server Client (Service Role):** Initialize **only** in server-only contexts (`.server.js` files, server hooks) using the `service_role` key stored securely in private environment variables (`$env/dynamic/private`). Use this for admin tasks or operations that *must* bypass RLS.
    *   **Client/User Context Client (Anon Key):** Initialize on the client-side (`.svelte`, `.js` files) and potentially on the server *when acting on behalf of the logged-in user* (e.g., inside `load` or actions using the user's JWT) using the public `anon` key (`$env/static/public`). This client *must* respect RLS policies.
*   **Manage Auth State:**
    *   **Client-Side:** Use `supabase.auth.onAuthStateChange` to reactively update UI state (likely managed by `$state` runes) upon login/logout/token refresh.
    *   **Server-Side:** Use `hooks.server.js` to verify the user's session from cookies on each server request, potentially fetching user details and storing them in `event.locals` for access in `load` functions and actions. Securely manage session cookies (httpOnly, secure).
*   **Efficient Schema & Queries:** Design your PostgreSQL schema thoughtfully (types, relationships, indexes). Write efficient Supabase queries, utilizing `.select()` projections to fetch only needed data. Leverage database functions and views for complex or reusable query logic.
*   **Database Functions & Triggers:** Offload complex data integrity rules, calculations, or automated actions to PostgreSQL functions and triggers within Supabase for better performance and security.
*   **Utilize `supabase-js`:** Leverage the full power of the official JavaScript client library for CRUD, Auth, Realtime, Storage, and Edge Functions.
*   **Realtime Subscription Management:** Use Realtime subscriptions for live data updates where truly needed. Be mindful of connection limits. **Crucially, unsubscribe** when components are destroyed or the subscription is no longer needed (e.g., in a cleanup function returned by `$effect`).
*   **Robust Error Handling:** Wrap Supabase client calls in `try...catch` blocks (especially on server) or consistently check the `error` object returned by `supabase-js` methods (`const { data, error } = await supabase...`).

**General / Cross-Cutting**

*   **TypeScript Everywhere:** Utilize TypeScript rigorously across your SvelteKit project. Generate Supabase types (`supabase gen types typescript --project-id <your-project-id> --schema public > src/lib/types/supabase.ts`) and use them for end-to-end type safety.
*   **Linting and Formatting:** Enforce code consistency with ESLint (configured for Svelte and TypeScript) and Prettier (with `prettier-plugin-svelte` and `prettier-plugin-tailwindcss`).
*   **Accessibility (a11y):** Prioritize accessibility from the start. Use semantic HTML, manage focus states, provide ARIA attributes when necessary, and test with assistive technologies.
*   **Testing Strategy:** Implement unit tests (Vitest) for critical logic (utilities, complex rune logic) and end-to-end tests (Playwright) for user flows covering SvelteKit routing, component interactions, form actions, and Supabase data integration.