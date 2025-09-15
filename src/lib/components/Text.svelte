<script lang="ts">
  import type { TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Asset, Entry } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import { onMount } from 'svelte';
  // import Parallax from './Parallax.svelte'

  let { item, small, first, visibleMedia = $bindable() }: { item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">, small?: boolean, visibleMedia?: Asset<"WITHOUT_UNRESOLVABLE_LINKS">, first?: boolean } = $props()

  let visible = $state(false)
  let hrElement: HTMLElement = $state(null)

  onMount(() => {
    if (!hrElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visible = !entry.isIntersecting && entry.boundingClientRect.top < 0

          if (visible) {
            visibleMedia = item.fields.media
          } else {
            visibleMedia = first ? item.fields.media : null
          }
        })
      },
      {
        rootMargin: '0px 0px 0px 0px',
        threshold: [1]
      }
    )

    observer.observe(hrElement)

    return () => {
      observer.disconnect()
    }
  })
</script>


<div class="text flex flex--gapped {item.fields.mediaAlignment}" class:media={item.fields.media} id={item.fields.id}>
  {#if item.fields.title}
  {#if small}
  <h6 class="col col--12of12"><hr bind:this={hrElement}>{item.fields.title}</h6>
  {:else}
  <h3 class="col col--12of12"><hr bind:this={hrElement}><em>{item.fields.title}</em></h3>
  {/if}
  {/if}
  {#if item.fields.body}
  <div class="text__body col col--mobile--12of12" class:col--6of12={item.fields.media} class:col--12of12={!item.fields.media}>
    <div class="flex flex--column flex--gapped">
      <Rich body={item.fields.body} />
    </div>
  </div>
  {/if}

  {#if item.fields.media}
  <figure class="col col--6of12 col--mobile--12of12 text__media text__media--{item.fields.mediaAlignment}" class:visible>
    <Media media={item.fields.media} />
  </figure>
  {/if}
</div>



<style lang="scss">
  .text {
    padding: $s1;

    @media (max-width: $tablet_portrait) {
      padding: $s-2;
    }

    h3 {
      position: sticky;
      top: 70px;
      z-index: 1;
      margin-bottom: calc($s8 * 1.5);

      @media (max-width: $tablet_portrait) {
        order: -2;
        top: 40px;
      }
    }

    &.media {
      > div {
        > div {
          max-width: 555px;
          margin: 0 auto;
        }
      }

      .text__body {
        display: flex;
        flex-direction: column;
        justify-content: center;

        @media (max-width: $tablet_portrait) {
          padding: $s0;
        }
      }

      &.Fixed {
        padding: 0;

        .text__body {
          margin: calc($s6) 0 $s6;
        }

        @media (min-width: $tablet_portrait) {
          .text__body {
            min-height: calc(100lvh - ($s6 * 2));
          }

          
        }

        h3 {
          margin-bottom: 0;
        }

        .text__media--Fixed {
          @media (min-width: $tablet_portrait) {
            display: none;
          }
        }

        @media (max-width: $tablet_portrait) {
          .text__body {
            order: 99;
            margin-top: 0;
          }
        }
      }

      &.Left {
        align-items: center;

        @media (min-width: $tablet_portrait) {
          figure {
            padding: $s2;
          }
        }
        
        h3,
        h6,
        hr {
          order: -2;
        }

        figure {
          order: -1;
          // padding-bottom: 0;
        }
      }

      :global(img),
      :global(video) {
        border-radius: calc($radius / 2);
      }
    }

    hr {
      height: 0px;
      margin: 0;
      position: relative;
      top: -71px;
    }

    :global(table) {
      table-layout: fixed;
      width: calc(100% + ($s0 * 2));
      border-collapse: separate;
      border-spacing: $s0;
      margin: 0 calc($s0 * -1) calc($s0 * -1);

      @media (max-width: $tablet_landscape) {
        width: calc(100% + ($s-2 * 2));
        border-spacing: $s-2;
        margin: 0 calc($s-2 * -1) calc($s-2 * -1);
        display: block;
        // max-width: 100%;
        overflow-x: auto;
      }
    }

    :global(th),
    :global(td) {
      padding: $s1;
      // border: 1px solid $gris;
      vertical-align: bottom;
      text-align: right;
      background-color: $beige;
      border-radius: $radius;
      min-width: 160px;

      :global(u) {
        font-size: $s3;
        font-weight: 400;
        text-decoration: none;

        @media (max-width: $tablet_landscape) {
          font-size: $s2;
        }
      }

      &:has(:global(p:empty)) {
        background-color: transparent !important;
      }
    }

    :global(td) {
      // height: 15vw;
    }

    :global(th) {
      font-family: $heading_font;
      background-color: $noir;
      color: $blanc;
      text-align: left;
    }

    :global(tr:nth-child(even) td) {
      background-color: $beige;
    }

    :global(tr:nth-child(odd) td) {
      // color: $blanc;
      background-color: $gris-pale;
    }

    &#volatility {
      .text__body {
        :global(p) { font-weight: 400; }
        :global(strong) {
          font-weight: 400;
          background-color: $blanc;
          border-radius: $radius;
          display: inline-block;
          width: 1.3em;
        }
      }
    }

    &#returns-comparison {
      :global(table) {
        :global(td:first-child p) {
          font-weight: 400;

          @media (max-width: $tablet_portrait) {
            font-size: calc($s0 - 2px);
          }
        }
      }
    }
  }
</style>