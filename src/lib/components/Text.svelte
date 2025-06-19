<script lang="ts">
  import type { TypeTextSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  import { onMount } from 'svelte';
  // import Parallax from './Parallax.svelte'

  let { item }: { item: Entry<TypeTextSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> } = $props()

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


<div class="text flex flex--column flex--center">
  <hr bind:this={hrElement}>
  {#if item.fields.title}
  <h3>{item.fields.title}</h3>
  {/if}
  {#if item.fields.body}
  <div>
    <div class="flex flex--column flex--gapped">
      <Rich body={item.fields.body} />
    </div>
  </div>
  {/if}
</div>

{#if item.fields.media}
<figure class="padded text__media" class:visible>
  <Media media={item.fields.media} />
</figure>
{/if}

<style lang="scss">
  .text {
    padding: $s1;
    min-height: 100lvh;

    h3 {
      margin-bottom: $s4;
    }

    > div {
      max-width: 555px;
    }

    hr {
      height: 0;
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

  .text__media {
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