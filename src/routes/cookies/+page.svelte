<script lang="ts">
  import Rich from '$lib/components/Rich.svelte'
  import { getLocale } from '$lib/paraglide/runtime'

  import type { PageData } from './$types'
  import { allowCookies, refuseCookies } from '$lib/stores/cookies.svelte'

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
    <button type="button" class="" onclick={allowCookies}>{getLocale() === 'fr' ? 'Autoriser les témoins' : 'Allow cookies'}</button>
    <button type="button" class="button--outline" onclick={refuseCookies}>{getLocale() === 'fr' ? 'Refuser les témoins' : 'Refuse cookies'}</button>
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