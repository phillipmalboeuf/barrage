<script lang="ts">
  import type { TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import { onMount } from 'svelte';
  // import Parallax from './Parallax.svelte'

  let { item, small }: { item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">, small?: boolean } = $props()

  let visible = $state(false)
  let hrElement: HTMLElement

  onMount(() => {
    if (!hrElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible = true
          } else {
            visible = false
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


<div class="text flex flex--gapped {item.fields.mediaAlignment}" class:media={item.fields.media}>
  <hr bind:this={hrElement}>
  {#if item.fields.title}
  {#if small}
  <h6 class="col col--12of12">{item.fields.title}</h6>
  {:else}
  <h3 class="col col--12of12"><em>{item.fields.title}</em></h3>
  {/if}
  {/if}
  {#if item.fields.body}
  <div class="text__body col col--tablet--12of12" class:col--6of12={item.fields.media} class:col--12of12={!item.fields.media}>
    <div class="flex flex--column flex--gapped">
      <Rich body={item.fields.body} />
    </div>
  </div>
  {/if}

  {#if item.fields.media}
  <figure class="padded col col--6of12 col--tablet--12of12 text__media text__media--{item.fields.mediaAlignment}" class:visible>
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
      margin-bottom: $s6;
    }

    &.media {
      > div {
        > div {
          max-width: 555px;
          margin: 0 auto;
        }
      }

      &.Fixed {
        @media (min-width: $tablet_portrait) {
          min-height: 100lvh;
        }

        h3,
        h6 {
          position: sticky;
          top: 80px;
          z-index: 1;

          @media (max-width: $tablet_portrait) {
            order: -2;
            top: 40px;
          }
        }
      }

      &.Left {
        align-items: flex-end;
        
        h3,
        h6,
        hr {
          order: -2;
        }

        figure {
          order: -1;
          padding-bottom: 0;
        }
      }
    }

    hr {
      height: 0;
      margin: 0;
    }

    :global(table) {
      width: 100%;
      border-collapse: separate;
      border-spacing: 10px;

      @media (max-width: $tablet_portrait) {
        display: block;
        max-width: 100%;
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
        font-size: $s2;
        text-decoration: none;
      }

      &:has(:global(p:empty)) {
        background-color: transparent !important;
      }
    }

    :global(td) {
      height: 15vw;
    }

    :global(tr:nth-child(even) td) {
      background-color: $brun;
    }

    :global(tr:nth-child(odd) td) {
      color: $blanc;
      background-color: $vert;
    }
  }

  .text__media--Fixed {
    @media (min-width: $tablet_portrait) {
      position: fixed;
      z-index: -2;
      top: 0;
      right: 0;
      height: 100lvh;
      width: 50%;
      
      opacity: 0;
      transition: opacity 0.666s;

      &.visible {
        opacity: 1;
      }

      :global(picture),
      :global(img),
      :global(video) {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    @media (max-width: $tablet_portrait) {
      order: -1;
    }
  }
</style>