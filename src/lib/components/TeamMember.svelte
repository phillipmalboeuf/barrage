<script lang="ts">
  import type { TypeTeamMemberSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Rich from './Rich.svelte'
  import Media from './Media.svelte'

  let { item }: { item: Entry<TypeTeamMemberSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> } = $props()
</script>


<div class="member flex flex--gapped">
  {#if item.fields.portrait}
  <figure class="col col--4of12 col--tablet--12of12 member__media">
    <Media media={item.fields.portrait} />
  </figure>
  {/if}
  <div class="col col--8of12 col--tablet--12of12">
    {#if item.fields.name}
    <h6>{item.fields.name}{#if item.fields.qualifications}<br>{item.fields.qualifications}{/if}</h6>
    {/if}
    {#if item.fields.jobTitle}
    <h6>{item.fields.jobTitle}</h6>
    {/if}
    {#if item.fields.bio}
    <div class="flex flex--column flex--gapped">
      <Rich body={item.fields.bio} />
    </div>
    {/if}
  </div>
</div>



<style lang="scss">
  .member {
    max-width: 1080px;
    margin: 0 auto;

    @media (max-width: $tablet_portrait) {
      margin-bottom: $s1;
    }

    h6 {
      margin-bottom: $s4;

      @media (max-width: $tablet_portrait) {
        margin-bottom: $s0;
      }
    }
  }
</style>