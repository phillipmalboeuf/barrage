<script lang="ts">
  import type { Entry } from 'contentful'
  
  import { isTypeGrid, isTypeHero, isTypeList, isTypeText, type TypeTextSkeleton } from '$lib/clients/content_types'
  import Hero from '$lib/components/Hero.svelte'
  import Text from '$lib/components/Text.svelte'
  import List from '$lib/components/List.svelte'
  import Grid from '$lib/components/Grid.svelte'
  
  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()
</script>

{#if data.page.fields.content?.length}
{#each data.page.fields.content as item, i}
<section class="{item.sys.contentType.sys.id}">
  {#if isTypeHero(item)}
  <Hero {item} />
  {:else if isTypeText(item)}
  <Text {item} />
  {:else if isTypeList(item)}
  <List list={item} />
  {:else if isTypeGrid(item)}
  <Grid grid={item} />
  {/if}
</section>
{/each}
{/if}


<style lang="scss">
  section {
    margin: $s7 0;

    &.hero:first-child {
      margin-top: -130px;
    }

    &.hero + &.hero {
      margin-top: calc($s7 * -1);
    }
  }
</style>