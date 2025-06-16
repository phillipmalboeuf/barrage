<script lang="ts">
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types';
  import type { Entry } from 'contentful';
  import Icon from './Icon.svelte'

  let { navigation }: {
    navigation: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    // buttons: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    // work: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()
</script>

<header class="padded flex flex--gapped flex--middle">
  <Icon icon="logo" label="Barrage Capital" />
  <nav class="flex flex--gapped flex--middle">
    {#each navigation.fields.links as link}
      <a href={link.fields.destination} target={link.fields.external ? '_blank' : undefined}>{link.fields.label}</a>
    {/each}
  </nav>
</header>

<style lang="scss">
  header {

    nav {
      width: auto;
      margin-left: auto;
    }
  }
</style>