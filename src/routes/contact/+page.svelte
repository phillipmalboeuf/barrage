<script lang="ts">
  import type { Entry } from 'contentful'
  import type { Document as RichTextDocument } from '@contentful/rich-text-types'
  
  import { isTypeForm, isTypeQuestion, type TypeFormSkeleton, type TypeQuestionSkeleton } from '$lib/clients/content_types'

  import Rich from '$lib/components/Rich.svelte'
  import Inputs from '$lib/components/Inputs.svelte'
  import { getLocale } from '$lib/paraglide/runtime'
  import { deserialize, enhance } from '$app/forms'
  import { page } from '$app/state';
  import { type ActionResult } from '@sveltejs/kit'

  import type { PageData, PageProps } from './$types'
  let { data }: { data: PageData} = $props()

  let active = $state<Entry<TypeQuestionSkeleton | TypeFormSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">>(data.question)
  let history = $state<Entry<TypeQuestionSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">[]>([])
  let selected = $state<string | null>(null)
  let error = $state<RichTextDocument | null>(null)
  let isValid = $state(false)
  let success = $state(false)

  let element = $state<HTMLFormElement>()
</script>

{#if success}
<section class="gris">
  {#if isTypeForm(active)}
  <Rich body={active.fields.successMessage} />
  {/if}
</section>
{:else}
<section class="gris">
  <form class="question flex flex--column flex--gapped" action={isTypeForm(active) ? active.fields.action : null} method={"POST"} bind:this={element} oninput={() => isValid = element.checkValidity()} onsubmit={async e => {
    e.preventDefault()
    if (selected && isTypeQuestion(active)) {
      const answer = active.fields.answers.find(answer => answer.fields.id === selected)
      if (answer.fields.error) {
        error = answer.fields.error
      } else {
        error = null
        history.push(active)
        isValid = false
        active = answer.fields.nextQuestion || active.fields.defaultNextQuestion
      } 
    } else {
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
            eventLabel: 'success'
          })
        }
      }
    }
  }}>
    {#if isTypeQuestion(active)}
    <div class="body">
      <Rich body={active.fields.body} />
    </div>
    <div class="answers flex flex--column flex--gapped">
      {#each active.fields.answers as answer}
      <label class="answer blanc flex flex--gapped flex--spaced flex--middle" for="answer-{active.fields.id}-{answer.fields.id}">
        <span>{answer.fields.label}</span>
        <input type="radio" bind:group={selected} name="answer-{active.fields.id}" id="answer-{active.fields.id}-{answer.fields.id}" value={answer.fields.id} />
      </label>
      {/each}
    </div>
    {:else if isTypeForm(active)}
    <div class="body">
      <Rich body={active.fields.introduction} />
    </div>
    <Inputs form={active} />
    {/if}

    {#if error}
    <div class="error">
      <Rich body={error} />
    </div>
    {/if}

    <div class="buttons flex flex--spaced">
      {#if history.length > 0}
      <button type="button" onclick={() => {
        const previousQuestion = history.pop()
        if (previousQuestion) {
          active = previousQuestion
        }
        error = null
        selected = null
      }}><span>←</span> {#if getLocale() === 'fr'}Retour{:else}Back{/if}</button>
      {:else}
      <span></span>
      {/if}
      <button type="submit" disabled={isTypeForm(active) ? !isValid : !selected}>{isTypeForm(active) ? getLocale() === 'fr' ? 'Envoyer' : 'Send' : getLocale() === 'fr' ? 'Suivant' : 'Next'} <span>→</span></button>
    </div>
  </form>
</section>
{/if}


<style lang="scss">
  section {
    padding: $s2;

    form {
      max-width: 555px;
      min-height: calc(100% - ($s4 * 1));
      margin: 0 auto;

      .body {
        margin-bottom: $s0;
      }

      .answers {
        // margin-bottom: $s4;

        .answer {
          cursor: pointer;
          border-radius: $radius;
          padding: $s0;
        }
      }

      .buttons {
        margin-top: auto;
      }

      .error {
        color: $rouge;
      }
    }
  }
</style>