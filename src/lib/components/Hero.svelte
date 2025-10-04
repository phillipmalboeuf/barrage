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
    <Media media={item.fields.media} mobileMedia={item.fields.mobileMedia} />
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
    min-height: 100svh;
    color: $blanc;

    @media (max-width: $tablet_portrait) {
      &:has(> .left) {
        justify-content: flex-start;
        padding-top: 25%;
      }
    }

    &__content {
      padding: $s1;

      @media (max-width: $tablet_portrait) {
        padding: $s-2;
      }

      :global(p) {
        font-size: calc($s1 - 2px);
        font-weight: 400;
      }
      
      &.flex--middle {
        text-align: center;
        // max-width: 1150px;
        font-style: italic;

        @media (max-width: $tablet_landscape) {
          // max-width: 700px;
        }

        @media (max-width: $mobile) {
          // max-width: 420px;
        }

        :global(strong) {
          font-style: normal;
        }
      }

      &.left {
        width: 50%;
        align-self: flex-end;

        @media (max-width: $tablet_portrait) {
          width: 100%;
          align-self: center;
        }

        > div {
          max-width: 420px;
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