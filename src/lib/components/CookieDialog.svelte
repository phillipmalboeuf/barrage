<script lang="ts">
  import { browser } from '$app/environment'
  import { preloadData } from '$app/navigation'
  import { fly } from 'svelte/transition'
  import { onMount } from 'svelte'

  import CookiesPage from '../../routes/cookies/+page.svelte'
  import AvertissementPage from '../../routes/avertissement/+page.svelte'
  import Icon from './Icon.svelte'

  import { cookiesState, closeCookiesDialog, initCookieConsent, avertissementState, closeAvertissementDialog, syncAvertissementVisibility } from '$lib/stores/cookies.svelte'
  import { localizeHref } from '$lib/paraglide/runtime';
  import { page } from '$app/state';

  onMount(() => {
    initCookieConsent()
  })

  $effect(() => {
    page.url.search
    if (!browser) return
    syncAvertissementVisibility(page.url.search.length > 0)
  })
</script>

<aside class="flex flex--gapped flex--bottom flex--center">
{#if page.url.search}
{#await preloadData(localizeHref('/avertissement')) then data}
<!-- <button class="button--fixed" type="button" aria-expanded={contactState.visible} aria-controls="contact-dialog" onclick={openContactDialog} transition:fly={{ y: '100%', opacity: 1, duration: 666 }}>Contact <Icon icon="email" label={undefined} /></button> -->

{#if avertissementState.visible}
<dialog class="flex flex--column" open onclose={closeAvertissementDialog} transition:fly={{ y: '110%', opacity: 1, duration: 666 }} id="avertissement-dialog">
  <div class="flex flex--middle flex--gapped flex--end"><button type="button" class="button--none" aria-controls="avertissement-dialog" aria-expanded={avertissementState.visible ? 'true' : 'false'} onclick={closeAvertissementDialog}><Icon icon="close" label="Close" /></button></div>
  {#if data.type === 'loaded'}
  <AvertissementPage data={data.data as any} />
  {/if}
</dialog>
{/if}
{/await}
{/if}

{#await preloadData(localizeHref('/cookies')) then data}
<!-- <button class="button--fixed" type="button" aria-expanded={contactState.visible} aria-controls="contact-dialog" onclick={openContactDialog} transition:fly={{ y: '100%', opacity: 1, duration: 666 }}>Contact <Icon icon="email" label={undefined} /></button> -->

{#if cookiesState.visible}
<dialog class="flex flex--column" open onclose={closeCookiesDialog} transition:fly={{ y: '110%', opacity: 1, duration: 666 }} id="cookies-dialog">
  <div class="flex flex--middle flex--gapped flex--end"><button class="button--none" aria-controls="cookies-dialog" aria-expanded={cookiesState.visible ? 'true' : 'false'} onclick={() => cookiesState.visible = !cookiesState.visible}><Icon icon="close" label="Close" /></button></div>
  {#if data.type === 'loaded'}
  <CookiesPage data={data.data as any} />
  {/if}
</dialog>
{/if}
{/await}
</aside>

<style lang="scss">
  // button.button--fixed {
  //   position: fixed;
  //   bottom: $s2;
  //   right: calc($s2 + $s-1);
  //   z-index: 47;

  //   @media (max-width: $tablet_portrait) {
  //     right: 50%;
  //     bottom: $s0;
  //     transform: translateX(50%);
  //     z-index: 100;
  //   }
  // }

  aside {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 105;
    width: 100%;
    max-height: 100svh;
    overflow-y: auto;
    pointer-events: none;

    @media (min-width: $tablet_portrait) {
      padding-bottom: 0;
    }

    @media (max-width: $tablet_portrait) {
      padding: $s0;
      height: 100svh;
      align-content: center;
    }
  }

  dialog {
    position: relative;
    width: fit-content;
    max-width: 730px;
    height: auto;
    border-radius: $radius;
    display: block !important;
    overflow-y: auto;
    background-color: $brun;
    font-size: calc($s-1 - 1px);
    pointer-events: auto;

    @media (min-width: $tablet_landscape) {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    @media (max-width: $tablet_portrait) {
      :global(p) {
        font-size: $s-2;
      }

      :global(button) {
        font-size: $s-1;
      }
    }

    > div {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 2;
    }

    button {
      padding: $s-2;
    }
  }
</style>