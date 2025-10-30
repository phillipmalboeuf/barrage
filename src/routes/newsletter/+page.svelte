<script lang="ts">
  import type { Entry } from 'contentful'
  import type { Document as RichTextDocument } from '@contentful/rich-text-types'
  
  import { isTypeForm, isTypeQuestion, type TypeFormSkeleton, type TypeQuestionSkeleton } from '$lib/clients/content_types'
  import { getLocale } from '$lib/paraglide/runtime'

  import Rich from '$lib/components/Rich.svelte'
  import Inputs from '$lib/components/Inputs.svelte'

  import { deserialize } from '$app/forms'
  import { type ActionResult } from '@sveltejs/kit'
  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()

  let error = $state<RichTextDocument | null>(null)
  let isValid = $state(false)
  let success = $state(false)

  let form = $state<HTMLFormElement>()
</script>

{#if success}
<section>
  <Rich body={data.form.fields.successMessage} />
</section>
{:else}
<section>
  <!-- <Rich body={data.form.fields.introduction} /> -->

  <form class="question flex flex--column flex--gapped" action={getLocale() == 'en' ? `/en/${data.form.fields.action}` : data.form.fields.action} method={"POST"} bind:this={form} oninput={() => isValid = form.checkValidity()} onsubmit={async e => {
    e.preventDefault()
    isValid = false
   
    const data = new FormData(e.currentTarget, e.submitter)

    const response = await fetch(e.currentTarget.action, {
      method: 'POST',
      body: data
    })

    const result: ActionResult = deserialize(await response.text())

    if (result.type === 'success') {
      success = true

      // Send GTM event
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'form_submission',
          eventLabel: 'success',
          eventCategory: 'newsletter'
        })
      }
    }
  }}>

    <div class="body">
      <Rich body={data.form.fields.introduction} />
    </div>
    <Inputs form={data.form} />

    <label for="input-newsletter-accept" class="flex flex--middle flex--gapped">
      <input type="checkbox" name="accept" id="input-newsletter-accept" required />
      <span>{#if getLocale() === 'fr'}J'accepte la <a href="/docs/Confidentialité des données numériques" target="_blank"><u>Politique de confidentialité des données numériques</u></a> de Barrage Capital. {:else}I agree to Barrage Capital’s <a href="/en/docs/Digital Data Privacy Policy" target="_blank"><u>Digital Data Privacy Policy.</u></a>{/if}</span>
    </label>

    {#if error}
    <div class="error">
      <Rich body={error} />
    </div>
    {/if}

    <div class="buttons flex flex--end">
      <button type="submit" disabled={!isValid}>{#if getLocale() === 'fr'}Envoyer{:else}Send{/if} <span>→</span></button>
    </div>
  </form>
</section>
{/if}

<style lang="scss">
  section {
    padding: $s1;
    background-color: $gris-pale;
    border-radius: $radius;

    form {
      max-width: 555px;
      margin: 0 auto;
      min-height: calc(100% - ($s4 * 1));
        
      label {
        flex-wrap: nowrap;

        span {
          font-size: $s-1;
        }
      }
      
      button {
        margin-top: $s1;
        align-self: flex-end;

        @media (max-width: $tablet_landscape) {
          margin-top: $s-1;
        }
      }

      .body {
        // margin-bottom: $s0;
      }

      .error {
        color: $rouge;
      }

      .buttons {
        margin-top: auto;
      }

      // label {
      //   flex-wrap: nowrap;
      //   margin: $s1;

      //   span {
      //     font-size: $s-1;
      //   }
      // }

      
    }
  }
</style>