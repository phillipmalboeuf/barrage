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
  <h3 class="col col--12of12">{item.fields.title}</h3>
  {/if}
  {/if}
  {#if item.fields.body}
  <div class="text__body col col--6of12">
    <div class="flex flex--column flex--gapped">
      <Rich body={item.fields.body} />
    </div>
  </div>
  {/if}

  {#if item.fields.media}
  <figure class="padded col col--6of12 text__media text__media--{item.fields.mediaAlignment}" class:visible>
    <Media media={item.fields.media} />
  </figure>
  {/if}
</div>



<style lang="scss">
  .text {
    padding: $s1;

    h3,
    h6 {
      // margin-bottom: $s4;
    }

    &.media {
      > div {
        > div {
          max-width: 555px;
          margin: 0 auto;
        }
      }

      &.Fixed {
        min-height: 100lvh;
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

  .text__media--Fixed {
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
</style>