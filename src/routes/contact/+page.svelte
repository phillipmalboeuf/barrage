<script lang="ts">
  import type { Entry } from 'contentful'
  import type { Document as RichTextDocument } from '@contentful/rich-text-types'
  
  import { isTypeForm, isTypeQuestion, type TypeFormSkeleton, type TypeQuestionSkeleton } from '$lib/clients/content_types'

  import Rich from '$lib/components/Rich.svelte'

  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()

  let active = $state<Entry<TypeQuestionSkeleton | TypeFormSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">>(data.question)
  let history = $state<Entry<TypeQuestionSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">[]>([])
  let selected = $state<string | null>(null)
  let error = $state<RichTextDocument | null>(null)
  let isValid = $state(false)

  let form = $state<HTMLFormElement>()
</script>

<section class="padded">
  <form class="question flex flex--column flex--gapped" action={isTypeForm(active) ? active.fields.action : null} method={"POST"} bind:this={form} oninput={() => isValid = form.checkValidity()} onsubmit={e => {
    if (selected && isTypeQuestion(active)) {
      e.preventDefault()
      const answer = active.fields.answers.find(answer => answer.fields.id === selected)
      if (answer.fields.error) {
        error = answer.fields.error
      } else {
        error = null
        history.push(active)
        isValid = false
        active = answer.fields.nextQuestion || active.fields.defaultNextQuestion
      } 
    }
  }}>
    {#if isTypeQuestion(active)}
    <div class="body">
      <Rich body={active.fields.body} />
    </div>
    <div class="answers flex flex--column flex--gapped">
      {#each active.fields.answers as answer}
      <label class="answer padded flex flex--gapped flex--spaced flex--middle" for="answer-{active.fields.id}-{answer.fields.id}">
        <span>{answer.fields.label}</span>
        <input type="radio" bind:group={selected} name="answer-{active.fields.id}" id="answer-{active.fields.id}-{answer.fields.id}" value={answer.fields.id} />
      </label>
      {/each}
    </div>
    {:else if isTypeForm(active)}
    <div class="body">
      <Rich body={active.fields.introduction} />
    </div>
    <div class="inputs flex flex--column flex--gapped">
      {#each active.fields.inputs as input}
      <div class="input padded">
        <label for="input-{active.fields.id}-{input.fields.id}">{input.fields.label}</label>
        {#if input.fields.type === 'Email'}
        <input type="email" name="{input.fields.id}" id="input-{active.fields.id}-{input.fields.id}" required />
        {:else if input.fields.type === 'Phone'}
        <input type="tel" name="{input.fields.id}" id="input-{active.fields.id}-{input.fields.id}" required />
        {:else if input.fields.type === 'Text'}
        <input type="text" name="{input.fields.id}" id="input-{active.fields.id}-{input.fields.id}" required />
        {:else if input.fields.type === 'Textarea'}
        <textarea name="{input.fields.id}" id="input-{active.fields.id}-{input.fields.id}" required></textarea>
        {/if}
      </div>
      {/each}
    </div>
    {/if}

    {#if error}
    <div class="error">
      <Rich body={error} />
    </div>
    {/if}

    <div class="buttons">
      {#if history.length > 0}
      <button type="button" onclick={() => {
        const previousQuestion = history.pop()
        if (previousQuestion) {
          active = previousQuestion
        }
        error = null
        selected = null
      }}><span>←</span> Back</button>
      {/if}
      <button type="submit" disabled={isTypeForm(active) ? !isValid : !selected}>{isTypeForm(active) ? 'Send' : 'Next'} <span>→</span></button>
    </div>
  </form>
</section>


<style lang="scss">
  section {
    background-color: $gris;

    form {
      max-width: 555px;
      margin: 0 auto;

      .body {
        margin-bottom: $s0;
      }

      .answers {
        // margin-bottom: $s4;

        .answer {
          cursor: pointer;
          background-color: $blanc;
          border-radius: $radius;
        }
      }

      .inputs {
        // margin-bottom: $s4;

        .input {
          width: 100%;
          background-color: $blanc;
          border-radius: $radius;
        }
      }

      .error {
        color: $rouge;
      }
    }
  }
</style>