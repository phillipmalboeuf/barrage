<script lang="ts">
  import { isTypeLink, isTypeNavigation, isTypeText, type TypeGridSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { onMount } from 'svelte'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Text from './Text.svelte'
  import Documents from './Documents.svelte'
  // import Parallax from './Parallax.svelte'

  let { grid }: { grid: Entry<TypeGridSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> } = $props()
</script>


<div class="grid flex flex--column">
  {#if grid.fields.title}
  <h3><em>{grid.fields.title}</em></h3>
  {/if}

  {#if grid.fields.items}
  <div class="grid__items" style:--columns={grid.fields.columns}>
    {#each grid.fields.items as item, index}
    <div class="grid__item {grid.fields.colors.length > index ? grid.fields.colors?.[index] : 'beige'}" style:--alignment={grid.fields.alignments?.length > index ? grid.fields.alignments?.[index] : undefined}>
      {#if isTypeText(item)}
      <Text {item} small />
      {:else if isTypeLink(item)}
      <a href={item.fields.destination} class="grid__item__link flex flex--column flex--spaced flex--gapped padded">
        <h6>{item.fields.title}</h6>
        <h3>{item.fields.label}</h3>
      </a>
      {/if}
    </div>
    {/each}
  </div>
  {/if}
</div>


<style lang="scss">
  .grid {
    padding: $s1;

    h3 {
      margin-bottom: $s6;
    }

    .grid__items {
      display: grid;
      grid-template-columns: repeat(var(--columns, 2), 1fr);
      grid-auto-rows: minmax(16vw, auto);
      gap: $s0;

      .grid__item {
        width: 100%;
        border-radius: $radius;
        grid-area: var(--alignment, auto);

        :global(.text) {
          height: 100%;

          :global(hr) {
            display: none;
          }

          :global(h2), :global(h3), :global(h4), :global(h5) {
            font-family: $body_font;
            // max-width: 530px;

            :global(u) {
              font-size: 160px;
              font-weight: 300;
              text-decoration: none;
            }
          }

          :global(h6) {
            text-align: right;
          }

          :global(h6 + div) {
            margin-top: auto;
          }
        }

        .grid__item__link {
          height: 100%;

          h6 {
            align-self: flex-end;
          }

          h3 {
            margin-bottom: 0;
          }
        }
      }
    }
  }
</style>