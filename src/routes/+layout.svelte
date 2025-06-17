<script lang="ts">
	import '../styles/styles.scss'
	
	// import { i18n } from '$lib/i18n/i18n.js';
	// import { ParaglideJS } from '@inlang/paraglide-sveltekit';
  
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	// import Articles from '$lib/components/Articles.svelte';

	import { page } from '$app/state'
  import { getLocale } from '$lib/paraglide/runtime';
	
	let { children, data } = $props();
</script>

<div class="flex">
	<Header navigation={data.navigations.main} />
	<main class="{page.route.id?.replaceAll('/', '-').replaceAll('[', '').replaceAll(']', '')} {page.url.pathname.replaceAll('/', '-')} {page.data.page?.fields.couleur}">
		
		{@render children()}

		<!-- <Articles articles={data.articles.items} full={page.url.pathname === '/actualites'} /> -->
	</main>
	<Footer navigations={data.navigations} />
</div>


<style lang="scss">
	div {

		main {
			width: 100%;
		}
	}
</style>