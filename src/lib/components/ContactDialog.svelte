<script lang="ts">
  import { preloadData } from '$app/navigation'
  import { fly } from 'svelte/transition'

  import ContactPage from '../../routes/contact/+page.svelte'
  import NewsletterPage from '../../routes/newsletter/+page.svelte'
  import Icon from './Icon.svelte'

  import { contactState, openContactDialog, closeContactDialog, openNewsletterDialog, closeNewsletterDialog } from '$lib/stores/contact.svelte'

  let { type='contact' }: { type?: 'contact' | 'newsletter' } = $props()
</script>

{#if type === 'contact'}
{#await preloadData('/contact') then data}
<button class="button--fixed" type="button" aria-expanded={contactState.visible} aria-controls="contact-dialog" onclick={openContactDialog} transition:fly={{ y: '100%', opacity: 1, duration: 666 }}>Contact <Icon icon="email" label={undefined} /></button>

{#if contactState.visible}
<dialog class="flex flex--column" open onclose={closeContactDialog} transition:fly={{ y: '110%', opacity: 1, duration: 666 }} id="contact-dialog">
  <h5 class="flex flex--middle flex--gapped flex--spaced bleu">Contact <button class="button--none" aria-controls="contact-dialog" aria-expanded={contactState.visible ? 'true' : 'false'} onclick={() => contactState.visible = !contactState.visible}><Icon icon="close" label="Close" /></button></h5>
  {#if data.type === 'loaded'}
  <ContactPage data={data.data as any} />
  {/if}
</dialog>
{/if}
{/await}
{:else if type === 'newsletter'}
{#await preloadData('/newsletter') then data}
<button class="flex flex--middle flex--spaced button--grey button--large" type="button" aria-expanded={contactState.newsletter} aria-controls="newsletter-dialog" onclick={openNewsletterDialog} transition:fly={{ y: '100%', opacity: 1, duration: 666 }}><span>Sign up to our newsletter</span> <Icon icon="newsletter" label={undefined} /></button>

{#if contactState.newsletter}
<dialog class="flex flex--column" open onclose={closeNewsletterDialog} transition:fly={{ y: '110%', opacity: 1, duration: 666 }} id="newsletter-dialog">
  <h5 class="flex flex--middle flex--gapped flex--spaced bleu">Newsletter form <button class="button--none" aria-controls="newsletter-dialog" aria-expanded={contactState.newsletter ? 'true' : 'false'} onclick={() => contactState.newsletter = !contactState.newsletter}><Icon icon="close" label="Close" /></button></h5>
  {#if data.type === 'loaded'}
  <NewsletterPage data={data.data as any} />
  {/if}
</dialog>
{/if}
{/await}
{/if}

<style lang="scss">
  button.button--fixed {
    position: fixed;
    bottom: $s2;
    right: $s2;
    z-index: 47;

    @media (max-width: $tablet_portrait) {
      right: 50%;
      bottom: $s-2;
      transform: translateX(50%);
    }
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
    z-index: 105;
    border-radius: $radius;
    display: block !important;

    @media (max-width: $tablet_portrait) {
      bottom: 0;
      right: 0;
      left: 0;
      width: 100%;
      max-width: 100%;
      max-height: calc(100lvh);
      height: 100lvh;
      border-radius: 0;

      :global(> section) {
        height: calc(100% - $s3*2);
      }
    }

    h5 {
      position: sticky;
      z-index: 2;
      top: -1px;
      left: 0;
      width: 100%;
      padding: $s0;
      border-top-left-radius: $radius;
      border-top-right-radius: $radius;

      @media (max-width: $tablet_portrait) {
        border-radius: 0;
      }
    }
  }
</style>