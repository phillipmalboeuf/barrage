<script lang="ts">
  import { isTypeNavigation, isTypeText, isTypeTeamMember, type TypeListSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  
  import Text from './Text.svelte'
  import Documents from './Documents.svelte'
  import TeamMember from './TeamMember.svelte'
  // import Parallax from './Parallax.svelte'

  let { list }: { list: Entry<TypeListSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> } = $props()
</script>


<div class="list flex flex--column">
  {#if list.fields.title}
  <h3>{list.fields.title}</h3>
  {/if}

  {#if list.fields.items}
  <div class="list__items flex flex--column flex--gapped">
    {#each list.fields.items as item, index}
    <div class="list__item">
      {#if isTypeText(item)}
      <Text {item} />
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
    min-height: 100lvh;

    @media (max-width: $tablet_portrait) {
      padding: $s-2;
    }

    h3 {
      margin-bottom: $s4;
    }

    .list__items {
      .list__item {
        width: 100%;
      }
    }
  }
</style>