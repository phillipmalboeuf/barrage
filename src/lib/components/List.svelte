<script lang="ts">
  import { isTypeNavigation, isTypeText, isTypeTeamMember, type TypeListSkeleton } from '$lib/clients/content_types'
  import type { Asset, Entry } from 'contentful'
  
  import Text from './Text.svelte'
  import Documents from './Documents.svelte'
  import TeamMember from './TeamMember.svelte'
  import Media from './Media.svelte'
  import { fade } from 'svelte/transition';
  // import Parallax from './Parallax.svelte'

  let { list }: { list: Entry<TypeListSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> } = $props()

  let visibleMedia = $state<Asset<"WITHOUT_UNRESOLVABLE_LINKS">[]>([])
</script>


<div class="list flex flex--column">
  {#if list.fields.title}
  <h3><em>{list.fields.title}</em></h3>
  {/if}

  {#if list.fields.items}
  <div class="list__items flex flex--column flex--gapped">
    <figure class="list__media">
      {#if visibleMedia?.length}
      {#each visibleMedia.filter(m => !!m) as media}
      <div class="list__media__item" transition:fade={{ duration: 666 }}>
        <Media {media} ar={1} />
      </div>
      {/each}
      {/if}
    </figure>

    {#each list.fields.items as item, index}
    <div class="list__item">
      {#if isTypeText(item)}
      <Text {item} bind:visibleMedia={visibleMedia[index]} first={index === 0} />
      {:else if isTypeNavigation(item)}
      <Documents {item} {index} />
      {:else if isTypeTeamMember(item)}
      <TeamMember {item} />
      {/if}
    </div>
    {/each}
  </div>
  {/if}
</div>


<style lang="scss">
  .list {
    padding: $s1;
    min-height: 100svh;

    @media (max-width: $tablet_portrait) {
      padding: $s-2;
      min-height: 0;
    }

    h3 {
      margin-bottom: $s4;
      margin-left: $s-1;
      position: sticky;
      top: 64px;
      z-index: 1;

      @media (max-width: $tablet_portrait) {
        order: -2;
        top: 48px;
      }
    }

    .list__items {

      &:has(:global(.text.Fixed)) {
        position: relative;

        .list__media {
          position: sticky;
          top: 0;
          right: 0;
          margin-left: auto;
          // margin-bottom: -100svh;
          height: 100svh;
          width: 50vw;

          // background-color: $beige;

          :global(picture),
          :global(img) {
            margin: $s0;
            position: absolute;
            top: 50%;
            left: 0;
            width: calc(100% - ($s0));
            // height: 100%;
            // object-fit: contain;
            transform: translateY(-50%);
            border-radius: calc($radius / 2);
          }

          + .list__item {
            margin-top: -100svh;

            @media (max-width: $tablet_portrait) {
              margin-top: 0;
              margin-bottom: $s3;
            }
          }

          @media (max-width: $tablet_portrait) {
            display: none;
          }
        }
      }

      .list__item {
        width: 100%;
      }
    }
  }
</style>