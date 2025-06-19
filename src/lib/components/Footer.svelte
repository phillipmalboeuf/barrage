<script lang="ts">
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import { getLocale, setLocale } from '$lib/paraglide/runtime';
  import type { Entry } from 'contentful'

  let { navigations, top=false }: {
    navigations: { [key: string]: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> }
    top?: boolean
  } = $props()
</script>

<footer class="padded flex">
  {#if top}
  <div class="flex flex--gapped flex--end">
    <button class="button--none" onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      Top
    </button>
  </div>
  {/if}
  
  <nav class="flex flex--gapped">
    <div class="col col--12of12 main-nav">
      <div class="flex flex--column flex--gapped">
      {#each navigations.main.fields.links as link}
        <a class="h2" href={link.fields.destination} target={link.fields.external ? '_blank' : undefined}>{link.fields.label}</a>
      {/each}
      </div>
    </div>
    <div class="locale-nav col col--12of12">
      <div class="flex flex--middle button-group">
        <button class:active={getLocale() === 'fr'} onclick={() => setLocale('fr')}>Français</button>
        <button class:active={getLocale() === 'en'} onclick={() => setLocale('en')}>English</button>
      </div>
    </div>
    <div class="col col--12of12 flex flex--gapped">
    {#each navigations.footer.fields.links as link}
      <a href={link.fields.destination} target={link.fields.external ? '_blank' : undefined}>{link.fields.label}</a>
    {/each}
    </div>
  </nav>
</footer>

<style lang="scss">
  footer {
    min-height: 100lvh;
    padding-top: 120px;
    background-color: $blanc;
    align-items: stretch;

    nav {
      max-width: 524px;
    }

    .main-nav {
      margin-bottom: auto;

      a {
        transition: transform 333ms;

        &:hover,
        &:focus-visible {
          font-style: italic;
          transform: translateX(6px);
        }
      }
    }

    .locale-nav {
      margin-top: auto;
    }

    .button-group {
      width: fit-content;
      background-color: $gris-pale;
      border-radius: $s2;
      padding: $s-3;
      margin-bottom: $s3;

      button {
        &:not(.active) {
          color: $noir;
          background-color: transparent;
        }
      }
    }
  }
</style>