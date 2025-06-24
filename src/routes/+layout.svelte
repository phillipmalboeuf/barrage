<script lang="ts">
	import '../styles/styles.scss'
  
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ContactDialog from '$lib/components/ContactDialog.svelte'

	import { page } from '$app/state'
  import { getLocale } from '$lib/paraglide/runtime';
	
	let { children, data } = $props();
</script>

<div class="flex">
	<Header navigations={data.navigations} />
	<main class="{page.route.id?.replaceAll('/', '-').replaceAll('[', '').replaceAll(']', '')} {page.url.pathname.replaceAll('/', '-')} {page.data.page?.fields.couleur}">
		
		{@render children()}

		<!-- <Articles articles={data.articles.items} full={page.url.pathname === '/actualites'} /> -->
	</main>
	<ContactDialog />
	<Footer navigations={data.navigations} top />
</div>


<style lang="scss">
	div {

		main {
			width: 100%;
		}
	}
</style>