<script lang="ts">
  import type { TypeFormSkeleton, TypeNavigationSkeleton } from '$lib/clients/content_types'
  import { getLocale, setLocale } from '$lib/paraglide/runtime'
  import type { Entry } from 'contentful'

  import Rich from './Rich.svelte'
  import Inputs from './Inputs.svelte'
  import Icon from './Icon.svelte'
  
  import { openContactDialog } from '$lib/stores/contact.svelte'
  import ContactDialog from './ContactDialog.svelte';

  let { navigations, form, top=false }: {
    navigations: { [key: string]: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> }
    form: Entry<TypeFormSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    top?: boolean
  } = $props()
</script>

<footer class="padded flex">
  {#if top}
  <div class="top">
    <button class="button--none" onclick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      Top <Icon icon="top" label={undefined} />
    </button>
  </div>
  {/if}
  
  <div class="col col--8of12 col--landscape--7of12 col--tablet--12of12 navs">
    <nav class="flex flex--gapped flex--column">
      <div class="col col--12of12 main-nav">
        <div class="flex flex--column flex--gapped">
        {#each navigations.main.fields.links as link}
          <a class="h2" href={link.fields.destination} target={link.fields.external ? '_blank' : undefined}>{link.fields.label}</a>
        {/each}
        </div>
      </div>
      <div class="locale-nav col col--12of12">
        <div class="flex flex--middle button-group">
          <button class:active={getLocale() === 'fr'} onclick={() => setLocale('fr')}>Français</button>
          <button class:active={getLocale() === 'en'} onclick={() => setLocale('en')}>English</button>
        </div>
        <div class="tablet_only">
          <ContactDialog type="newsletter" />
        </div>
      </div>
      
      <div class="col col--12of12 flex flex--gapped footer-nav">
      {#each navigations.footer.fields.links as link, index}
        <a class:first={index === 0} href={link.fields.destination} target={link.fields.external ? '_blank' : undefined}>{link.fields.label}</a>
      {/each}
      </div>
    </nav>
  </div>
  
  <div class="col col--4of12 col--landscape--5of12 col--tablet--12of12">
    <div class="flex flex--column flex--gapped forms">
      {#if form}
      <div class="flex flex--column flex--gapped form padded">
        <Rich body={form.fields.introduction} />
        <form action={form.fields.action} method="post" class="flex flex--column flex--gapped">
          <Inputs {form} />
          <label for="input-newsletter-accept" class="flex flex--middle flex--gapped">
            <input type="checkbox" name="accept" id="input-newsletter-accept" required />
            <span>{#if getLocale() === 'fr'}J’accepte la <a href="/privacy"><u>politique de confidentialité</u></a> de Barrage Capital. {:else}I agree to Barrage Capital’s <a href="/privacy"><u>Privacy Policy.</u></a>{/if}</span>
          </label>
          <button type="submit">{#if getLocale() === 'fr'}Envoyer{:else}Send{/if} <span>→</span></button>
        </form>
      </div>
      {/if}
      <div class="flex flex--column flex--gapped contact padded">
        <h4>{#if getLocale() === 'fr'}Vous souhaitez devenir client ou vous avez des questions?{:else}Want to become a client, or have some questions?{/if}<br>↘&#xFE0E;</h4>
        <button type="button" onclick={openContactDialog}>
          Contact <Icon icon="email" label={undefined} />
        </button>
      </div>
    </div>
  </div>
</footer>

<style lang="scss">
  footer {
    position: relative;
    // z-index: 50;
    min-height: 100lvh;
    padding-top: 120px;
    background-color: $blanc;
    align-items: stretch;

    nav {
      // max-width: 524px;
      min-height: 100%;

      @media (max-width: $tablet_portrait) {
        max-width: none;
        padding-bottom: 80px;
      }
    }

    .top {
      position: absolute;
      top: 0;
      right: 0;
      padding: $s1;
      background-color: $blanc;

      @media (max-width: $tablet_landscape) {
        display: none;
      }
    }

    .footer-nav {
      a {
        &:first-child {
          width: 100%;
        }
      }
    }

    .main-nav {
      margin-bottom: auto;

      @media (max-width: $tablet_portrait) {
        margin: $s4 0;
      }

      a {
        font-family: $body_font;
        // font-feature-settings: 'cv11' 1;
        font-weight: 400;
        font-size: $s5;
        transition: transform 333ms;

        &:hover,
        &:focus-visible {
          font-style: italic;
          transform: translateX(6px);
        }

        @media (max-width: $mobile) {
          font-size: $s4;
        }
      }
    }

    .locale-nav {
      margin-top: auto;

      @media (max-width: $tablet_portrait) {
        order: 99;
      }
    }

    .button-group {
      width: fit-content;
      background-color: $gris-pale;
      border-radius: $s2;
      padding: $s-3;
      margin-bottom: $s3;

      button {
        &:not(.active) {
          color: $noir;
          background-color: transparent;
        }
      }

      @media (max-width: $tablet_portrait) {
        width: 100%;
        padding: calc($s-2 / 2);
        margin-bottom: $s-3;
        margin-top: $s2;

        button {
          flex: 1;
        }
      }
    }

    .tablet_only {
      @media (min-width: #{$tablet_portrait + 1px}) {
        display: none;
      }
    }

    .forms {
      height: 100%;

      @media (max-width: $tablet_portrait) {
        display: none;
      }
    }

    .navs {
      @media (max-width: $tablet_portrait) {
        min-height: calc(100svh - 80px);
      }
    }

    .form {
      background-color: $gris-pale;
      border-radius: $radius;
      flex: 1;

      form {
        margin-top: auto;
        
        label {
          flex-wrap: nowrap;

          span {
            font-size: $s-1;
          }
        }
        
        button {
          margin-top: $s1;
          align-self: flex-end;
        }
      }
    }

    .contact {
      position: relative;
      z-index: 49;
      background-color: $bleu;
      border-radius: $radius;
      color: $blanc;
      flex: 1;

      button {
        border: 1px solid;
        margin-top: auto;
        margin-left: auto;
      }
    }
  }
</style>