<script lang="ts">
  import { isTypeNavigation, isTypeText, type TypeListSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { onMount } from 'svelte'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Text from './Text.svelte'
  import Documents from './Documents.svelte'
  // import Parallax from './Parallax.svelte'

  let { list }: { list: Entry<TypeListSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> } = $props()
</script>


<div class="list flex flex--column">
  {#if list.fields.title}
  <h3>{list.fields.title}</h3>
  {/if}

  {#if list.fields.items}
  <div class="list__items flex flex--column flex--gapped">
    {#each list.fields.items as item, index}
    <div class="list__item">
      {#if isTypeText(item)}
      <Text {item} />
      {:else if isTypeNavigation(item)}
      <Documents {item} {index} />
      {/if}
    </div>
    {/each}
  </div>
  {/if}
</div>


<style lang="scss">
  .list {
    padding: $s1;
    min-height: 100lvh;

    h3 {
      margin-bottom: $s4;
    }

    .list__items {
      .list__item {
        width: 100%;
      }
    }
  }
</style>