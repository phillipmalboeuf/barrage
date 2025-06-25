<script lang="ts">
  import type { Entry } from 'contentful'
  
  import { isTypeHero, isTypeList, isTypeText, type TypeTextSkeleton } from '$lib/clients/content_types'
  import Hero from '$lib/components/Hero.svelte'
  import Text from '$lib/components/Text.svelte'
  import List from '$lib/components/List.svelte'

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
  {/if}
</section>
{/each}
{/if}


<style lang="scss">
  section {

    &.hero:first-child {
      margin-top: -130px;
    }
  }
</style>