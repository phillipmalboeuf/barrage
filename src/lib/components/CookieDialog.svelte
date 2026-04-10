<script lang="ts">
  import { preloadData } from '$app/navigation'
  import { fly } from 'svelte/transition'

  import CookiesPage from '../../routes/cookies/+page.svelte'
  import AvertissementPage from '../../routes/avertissement/+page.svelte'
  import Icon from './Icon.svelte'

  import { cookiesState, openCookiesDialog, closeCookiesDialog, avertissementState, openAvertissementDialog, closeAvertissementDialog } from '$lib/stores/cookies.svelte'
  import { getLocale, localizeHref } from '$lib/paraglide/runtime';
  import { page } from '$app/state';
</script>

<aside class="flex flex--gapped flex--bottom flex--center">
{#if page.url.search}
{#await preloadData(localizeHref('/avertissement')) then data}
<!-- <button class="button--fixed" type="button" aria-expanded={contactState.visible} aria-controls="contact-dialog" onclick={openContactDialog} transition:fly={{ y: '100%', opacity: 1, duration: 666 }}>Contact <Icon icon="email" label={undefined} /></button> -->

{#if avertissementState.visible}
<dialog class="flex flex--column" open onclose={closeAvertissementDialog} transition:fly={{ y: '110%', opacity: 1, duration: 666 }} id="avertissement-dialog">
  <div class="flex flex--middle flex--gapped flex--end"><button class="button--none" aria-controls="avertissement-dialog" aria-expanded={avertissementState.visible ? 'true' : 'false'} onclick={() => avertissementState.visible = !avertissementState.visible}><Icon icon="close" label="Close" /></button></div>
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
    bottom: $s1;
    left: 0;
    right: 0;
    z-index: 105;
    width: 100%;
  }

  dialog {
    position: relative;
    width: fit-content;
    max-width: 660px;
    height: auto;
    // max-height: calc(100svh - ($s1 * 2) - 120px);
    overflow-y: auto;
    border-radius: $radius;
    display: block !important;
    background-color: $brun;

    @media (max-width: $tablet_portrait) {
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

    // h5 {
    //   position: sticky;
    //   z-index: 2;
    //   top: -1px;
    //   left: 0;
    //   width: 100%;
    //   padding: $s0;
    //   border-top-left-radius: $radius;
    //   border-top-right-radius: $radius;

    //   @media (max-width: $tablet_portrait) {
    //     border-radius: 0;
    //   }
    // }
  }
</style>