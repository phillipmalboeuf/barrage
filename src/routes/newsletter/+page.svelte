<script lang="ts">
  import type { Entry } from 'contentful'
  import type { Document as RichTextDocument } from '@contentful/rich-text-types'
  
  import { isTypeForm, isTypeQuestion, type TypeFormSkeleton, type TypeQuestionSkeleton } from '$lib/clients/content_types'

  import Rich from '$lib/components/Rich.svelte'
  import Inputs from '$lib/components/Inputs.svelte'

  import type { PageData } from './$types'
  import { getLocale } from '$lib/paraglide/runtime';
  let { data }: { data: PageData } = $props()

  let error = $state<RichTextDocument | null>(null)
  let isValid = $state(false)

  let form = $state<HTMLFormElement>()
</script>

<section class="gris">
  <form class="question flex flex--column flex--gapped" action={data.form.fields.action} method={"POST"} bind:this={form} oninput={() => isValid = form.checkValidity()}>

    <div class="body">
      <Rich body={data.form.fields.introduction} />
    </div>
    <Inputs form={data.form} />

    <label for="input-newsletter-accept" class="flex flex--middle flex--gapped">
      <input type="checkbox" name="accept" id="input-newsletter-accept" required />
      <span>{#if getLocale() === 'fr'}J'accepte la <a href="/privacy"><u>Politique de confidentialité des données numériques</u></a> de Barrage Capital. {:else}I agree to Barrage Capital’s <a href="/privacy"><u>Digital Data Privacy Policy.</u></a>{/if}</span>
    </label>

    {#if error}
    <div class="error">
      <Rich body={error} />
    </div>
    {/if}

    <div class="buttons flex flex--end">
      <button type="submit" disabled={!isValid}>{'Send'} <span>→</span></button>
    </div>
  </form>
</section>


<style lang="scss">
  section {
    padding: $s2;

    form {
      max-width: 555px;
      margin: 0 auto;
      min-height: calc(100% - ($s4 * 1));

      .body {
        margin-bottom: $s0;
      }

      .error {
        color: $rouge;
      }

      .buttons {
        margin-top: auto;
      }

      label {
        flex-wrap: nowrap;
        margin: $s1;

        span {
          font-size: $s-1;
        }
      }
    }
  }
</style>