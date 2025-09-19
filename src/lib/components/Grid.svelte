<script lang="ts">
  import { isTypeLink, isTypeNavigation, isTypeText, type TypeGridSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { onMount } from 'svelte'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import Text from './Text.svelte'
  import Documents from './Documents.svelte'
  import { localizeHref } from '$lib/paraglide/runtime'
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
      <a href={item.fields.external ? item.fields.destination : localizeHref(item.fields.destination)} target={item.fields.external ? '_blank' : undefined} class="grid__item__link flex flex--column flex--spaced flex--gapped padded">
        <h6>{@html item.fields.label.replace('&', '<br>&')}</h6>
        <h3>{item.fields.title} <span>↘&#xFE0E;</span></h3>
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

    @media (max-width: $tablet_portrait) {
      padding: $s-2;
    }

    > h3 {
      margin-bottom: calc($s6 + ($s8 * 1.5));
      margin-left: $s-1;
      position: sticky;
      top: 64px;
      z-index: 1;

      @media (max-width: $tablet_portrait) {
        order: -2;
        top: 38px;
      }
    }

    .grid__items {
      display: grid;
      width: 100%;
      grid-template-columns: repeat(var(--columns, 2), 1fr);
      grid-auto-rows: minmax(16vw, auto);
      gap: $s0;

      @media (max-width: $tablet_portrait) {
        grid-template-columns: repeat(1, 1fr);
        grid-auto-rows: minmax(25vh, auto);
        gap: $s-2;
      }

      .grid__item {
        width: 100%;
        border-radius: $radius;

        @media (min-width: $tablet_portrait) {
          grid-area: var(--alignment, auto);
        }

        :global(.text) {
          height: 100%;

          :global(hr) {
            display: none;
          }

          :global(h2), :global(h3), :global(h4), :global(h5) {
            font-family: $body_font;
            // max-width: 530px;

            :global(u) {
              font-size: 10vw;
              font-weight: 300;
              letter-spacing: -0.05em;
              text-decoration: none;
              line-height: 0;

              @media (max-width: $tablet_landscape) {
                font-size: 8vw;
              }

              @media (max-width: $tablet_portrait) {
                font-size: 80px;
              }
            }
          }

          :global(p) {
            @media (max-width: $mobile) {
              font-size: calc($s0 - 2px);
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
            text-align: right;
          }

          h3 {
            margin-bottom: 0;
            font-family: $body_font;

            span {
              opacity: 0;
              display: inline-block;
              transform: translateY(10px) rotate(-90deg);
              transition: opacity 333ms, transform 333ms;
            }
          }

          &:hover,
          &:focus-visible {
            h3 {
              font-style: italic;

              span {
                opacity: 1;
                transform: translateY(0) rotate(-90deg);
              }
            }
          }
        }
      }
    }
  }
</style>