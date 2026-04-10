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
  <h4>{data.text.fields.title}</h4>
  {/if}
  {#if data.text.fields.body}
  <Rich body={data.text.fields.body} />
  {/if}

  <div class="buttons flex flex--gapped">
    <button class="">{getLocale() === 'fr' ? 'Autoriser les témoins' : 'Allow cookies'}</button>
    <button class="button--outline">{getLocale() === 'fr' ? 'Refuser les témoins' : 'Refuse cookies'}</button>
  </div>
</section>


<style lang="scss">
  section {
    padding: $s2;

    .buttons {
      margin-top: $s0;
    }
  }
</style>