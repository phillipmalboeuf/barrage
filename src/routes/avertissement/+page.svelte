<script lang="ts">
  import type { Entry } from 'contentful'
  import type { Document as RichTextDocument } from '@contentful/rich-text-types'
  
  import { isTypeForm, isTypeQuestion, type TypeFormSkeleton, type TypeQuestionSkeleton, type TypeTextSkeleton } from '$lib/clients/content_types'

  import Rich from '$lib/components/Rich.svelte'
  import { getLocale, localizeHref } from '$lib/paraglide/runtime'

  import type { PageData, PageProps } from './$types'
  let { data }: { data: PageData} = $props()
</script>


<section class="brun flex flex--gapped flex--column">
  {#if data.text.fields.title}
  <h4>{@html data.text.fields.title}</h4>
  {/if}
  {#if data.text.fields.body}
  <Rich body={data.text.fields.body} />
  {/if}
</section>


<style lang="scss">
  section {
    padding: $s2;
  }
</style>