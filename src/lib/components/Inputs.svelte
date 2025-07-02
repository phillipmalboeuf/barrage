<script lang="ts">
  import type { TypeFormSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  let { form }: {
    form: Entry<TypeFormSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()
</script>


<div class="inputs flex flex--column flex--gapped">
  {#each form.fields.inputs as input}
  <div class="input blanc">
    <label for="input-{form.fields.id}-{input.fields.id}">{input.fields.label} *</label>
    {#if input.fields.type === 'Email'}
    <input type="email" name="{input.fields.id}" id="input-{form.fields.id}-{input.fields.id}" required placeholder={input.fields.label} />
    {:else if input.fields.type === 'Phone'}
    <input type="tel" name="{input.fields.id}" id="input-{form.fields.id}-{input.fields.id}" required placeholder={input.fields.label} />
    {:else if input.fields.type === 'Text'}
    <input type="text" name="{input.fields.id}" id="input-{form.fields.id}-{input.fields.id}" required placeholder={input.fields.label} />
    {:else if input.fields.type === 'Textarea'}
    <textarea name="{input.fields.id}" id="input-{form.fields.id}-{input.fields.id}" required placeholder={input.fields.label}></textarea>
    {/if}
  </div>
  {/each}
</div>

<style lang="scss">
  .inputs {
    // margin-bottom: $s4;

    .input {
      position: relative;
      width: 100%;
      border-radius: $radius;

      label {
        position: absolute;
        top: 50%;
        left: 0;
        padding: $s0;
        transform: translateY(-50%);
        pointer-events: none;

        &:not(:has(+ input:placeholder-shown)) {
          opacity: 0;
        }
      }
      
      input, textarea {
        border: none;
        padding: $s0;
        border-radius: $radius;
      }
    }
  }
</style>