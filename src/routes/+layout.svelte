<script lang="ts">
	import '../styles/styles.scss'
  
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ContactDialog from '$lib/components/ContactDialog.svelte'
	import CookieDialog from '$lib/components/CookieDialog.svelte'

	import { page } from '$app/state'
  import { getLocale } from '$lib/paraglide/runtime';
	
	let { children, data } = $props();
</script>

<div class="flex">
	<Header navigations={data.navigations} form={data.newsletterForm} />
	<main class="{page.route.id?.replaceAll('/', '-').replaceAll('[', '').replaceAll(']', '')} {page.url.pathname.replaceAll('/', '-')} {page.data.page?.fields.couleur}">
		
		{@render children()}

		<!-- <Articles articles={data.articles.items} full={page.url.pathname === '/actualites'} /> -->
	</main>
	<ContactDialog />
	<CookieDialog />
	<Footer navigations={data.navigations} top form={data.newsletterForm} />
</div>


<style lang="scss">
	div {

		main {
			width: 100%;
		}
	}
</style>