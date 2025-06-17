<script lang="ts">
  import type { TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  // import Parallax from './Parallax.svelte'

  let { item }: { item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> } = $props()
</script>

<div class="text">
  <Rich body={item.fields.body} />
</div>

<style lang="scss">
  .text {
    padding: $s1;

    :global(table) {
      width: 100%;
      border-collapse: separate;
      border-spacing: 10px;
    }

    :global(th),
    :global(td) {
      padding: $s1;
      // border: 1px solid $gris;
      vertical-align: bottom;
      text-align: right;
      background-color: $beige;
      border-radius: $radius;
    }

    :global(td) {
      height: 315px;
    }

    :global(tr:nth-child(even) td) {
      background-color: $brun;
    }

    :global(tr:nth-child(odd) td) {
      color: $blanc;
      background-color: $vert;
    }
  }
</style>