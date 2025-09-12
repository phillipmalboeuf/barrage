<script lang="ts">
  import type { TypeTeamMemberSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'

  let { item }: { item: Entry<TypeTeamMemberSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> } = $props()
</script>


<div class="member flex flex--thick_gapped">
  {#if item.fields.portrait}
  <figure class="col col--4of12 col--mobile--12of12 member__media">
    <Media media={item.fields.portrait} ar={1} />
  </figure>
  {/if}
  <div class="col col--8of12 col--mobile--12of12">
    {#if item.fields.name}
    <h4>{item.fields.name}{#if item.fields.qualifications}<br>{item.fields.qualifications}{/if}</h4>
    {/if}
    {#if item.fields.jobTitle}
    <h6>{item.fields.jobTitle}</h6>
    {/if}
    {#if item.fields.bio}
    <div class="flex flex--column flex--gapped member__bio">
      <Rich body={item.fields.bio} />
    </div>
    {/if}
  </div>
</div>



<style lang="scss">
  .member {
    max-width: 1080px;
    margin: 0 auto;

    @media (max-width: $tablet_landscape) {
      max-width: 900px;
    }

    @media (max-width: $tablet_portrait) {
      margin-bottom: $s1;

      > div {
        padding: $s0;
      }
    }

    h4 {
      margin-bottom: $s1;

      @media (max-width: $tablet_landscape) {
        margin-bottom: $s0;
      }
    }

    h6 {
      margin-bottom: $s1;

      @media (max-width: $tablet_landscape) {
        margin-bottom: $s0;
      }
    }

    &__media {
      :global(img) {
        border-radius: calc($radius / 2);
      }
    }

    &__bio {
      margin-bottom: $s3;

      :global(p) {
        font-size: $s-1;
        max-width: 645px;
      }
    }
  }
</style>