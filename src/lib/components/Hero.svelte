<script lang="ts">
  import type { TypeHeroSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'
  // import Parallax from './Parallax.svelte'

  let { item }: { item: Entry<TypeHeroSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> } = $props()
</script>

<div class="hero">
  <figure>
    {#if item.fields.media}
    <Media media={item.fields.media} />
    {/if}
  </figure>
  <div class="hero__content padded {item.fields.alignment === 'Left' ? 'left' : 'flex--middle'}">
    <div class="flex flex--column flex--gapped flex--spaced">
      <Rich body={item.fields.body} />
    </div>
  </div>
</div>

<style lang="scss">
  .hero {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100lvh;
    color: $blanc;

    &__content {
      padding: $s1;
      
      &.flex--middle {
        text-align: center;
        max-width: 1000px;
        font-style: italic;

        :global(strong) {
          font-style: normal;
        }
      }

      &.left {
        width: 50%;
        align-self: flex-end;

        > div {
          max-width: 520px;
          margin: 0 auto;
        }
      }
    }

    figure {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-color: $noir;

      :global(picture),
      :global(img),
      :global(video) {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
</style>