<script lang="ts">
  import { preloadData } from '$app/navigation'
  import { fly } from 'svelte/transition'

  import ContactPage from '../../routes/contact/+page.svelte'
  import Icon from './Icon.svelte'

  import { contactState, openContactDialog, closeContactDialog } from '$lib/stores/contact.svelte'
</script>


{#await preloadData('/contact') then data}
<button type="button" aria-expanded={contactState.visible} aria-controls="contact-dialog" onclick={openContactDialog} transition:fly={{ y: '100%', opacity: 1, duration: 666 }}>Contact <Icon icon="email" label={undefined} /></button>

{#if contactState.visible}
<dialog class="flex flex--column" open onclose={closeContactDialog} transition:fly={{ y: '110%', opacity: 1, duration: 666 }} id="contact-dialog">
  <h5 class="flex flex--middle flex--gapped flex--spaced bleu">Contact <button class="button--none" aria-controls="contact-dialog" aria-expanded={contactState.visible ? 'true' : 'false'} onclick={() => contactState.visible = !contactState.visible}><Icon icon="close" label="Close" /></button></h5>
  {#if data.type === 'loaded'}
  <ContactPage data={data.data as any} />
  {/if}
</dialog>
{/if}
{/await}

<style lang="scss">
  button:not(.button--none) {
    position: fixed;
    bottom: $s2;
    right: $s2;
    z-index: 1000;
  }

  dialog {
    position: fixed;
    bottom: $s1;
    right: $s1;
    margin-left: auto;
    width: fit-content;
    max-width: 360px;
    height: auto;
    max-height: calc(100vh - ($s1 * 2) - 120px);
    overflow-y: auto;
    z-index: 1002;
    border-radius: $radius;
    display: block !important;

    h5 {
      position: sticky;
      top: -1px;
      left: 0;
      width: 100%;
      padding: $s0;
      border-top-left-radius: $radius;
      border-top-right-radius: $radius;
    }
  }
</style>