<script lang="ts">
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types'
  import { getLocale, setLocale } from '$lib/paraglide/runtime';
  import type { Entry } from 'contentful'

  let { navigations }: { navigations: { [key: string]: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> } } = $props()
</script>

<footer class="padded flex">
  
  <nav class="flex flex--gapped">
    <div class="col col--12of12">
      <div class="flex flex--middle button-group">
        <button class:active={getLocale() === 'fr'} onclick={() => setLocale('fr')}>Français</button>
        <button class:active={getLocale() === 'en'} onclick={() => setLocale('en')}>English</button>
      </div>
    </div>
    {#each navigations.footer.fields.links as link}
      <a href={link.fields.destination} target={link.fields.external ? '_blank' : undefined}>{link.fields.label}</a>
    {/each}
  </nav>
</footer>

<style lang="scss">
  footer {
    min-height: 100lvh;

    nav {
      margin-top: auto;
      max-width: 524px;
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