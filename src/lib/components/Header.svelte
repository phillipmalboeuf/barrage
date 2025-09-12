<script lang="ts">
  import type { TypeFormSkeleton, TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import { fly } from 'svelte/transition'
  import { onNavigate } from '$app/navigation'

  import Icon from './Icon.svelte'
  import Footer from './Footer.svelte'
  import Rich from './Rich.svelte'
  
  import { headerState } from '$lib/stores/header.svelte'

  let { navigations, form }: {
    navigations: { [key: string]: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> }
    form: Entry<TypeFormSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    // buttons: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    // work: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()

  let scrollY = $state(0)
  let innerHeight = $state(1000)
  let headerHeight = $state(0)
  // let lastScrollY = 0
  let menuOpen = $state(false)
  let scrolled = $state(false)

  $effect(() => {
    if (menuOpen && scrollY < 45) {
      window.scrollTo({ top: 45, behavior: 'instant' })
    }
    document.documentElement.classList.toggle('noscroll', menuOpen)
  })

  function onScroll() {
    // lastScrollY = scrollY < 0 ? 0 : scrollY
    console.log(window.scrollY)
    scrolled = window.scrollY > 90
  }

  onNavigate(() => {
    menuOpen = false
  })
</script>

<svelte:window bind:scrollY bind:innerHeight onscroll={onScroll} />

<!-- <header bind:offsetHeight={headerHeight} class="flex flex--middle"> -->
  {#if navigations.main.fields.alert}
  <aside>
    <small><Rich body={navigations.main.fields.alert} /></small>
  </aside>
  {/if}
  <nav class="logo-nav padded" class:open={menuOpen} bind:offsetHeight={headerHeight} class:dark={headerState.dark} bind:this={headerState.element}>
    <a href="/">
      <Icon icon="logo" label="Barrage Capital" />
    </a>
  </nav>
  <nav class="main-nav padded flex flex--gapped flex--middle" class:dark={headerState.dark}>
    {#each navigations.main.fields.links as link}
      <a href={link.fields.destination} target={link.fields.external ? '_blank' : undefined}>{link.fields.label}</a>
    {/each}
  </nav>
  <nav class="menu-nav padded" class:open={menuOpen} class:dark={headerState.dark}>
    <button class="button--none" aria-controls="menu" aria-expanded={menuOpen ? 'true' : 'false'} onclick={() => menuOpen = !menuOpen} class:scrolled>
      <span>{#if menuOpen}Close{:else}Menu{/if}</span>
      {#if menuOpen}
        <Icon icon="close" label={undefined} />
      {:else}
        <Icon icon="menu" label={undefined} />
      {/if}
    </button>
    {#if menuOpen}
    <dialog open id="menu" transition:fly={{ x: '100%', opacity: 1, duration: 666 }}>
      <Footer navigations={navigations} {form} />
    </dialog>
    {/if}
  </nav>
<!-- </header> -->

<style lang="scss">
  // header {
  //   // position: fixed;
  //   // top: 0;
  //   // left: 0;
  //   width: 100%;
  //   // z-index: 100;
  //   // color: $blanc;
  //   // transition: background-color 666ms, color 666ms;

  //   // &.hide {
  //   //   transform: translateY(-100%);
  //   // }

  //   &.dark {
  //     // background-color: fade-out($blanc, 0.1);
  //     // backdrop-filter: blur(10px);
  //     color: $noir;
  //   }
  // }

    aside {
      color: $blanc;
      background-color: $bleu;
      width: 100%;
      padding: $s-3;
      text-align: right;

      @media (max-width: $tablet_portrait) {
        small {
          font-size: $s-2;
        }
      }
    }

    nav {
      width: auto;
      transition: color 666ms;
      position: relative;
      z-index: 50;

      color: $noir;

      &.dark {
        color: $blanc;
      }
      
      a {
        font-weight: 500;
        transition: transform 333ms;

        &:hover,
        &:focus-visible {
          font-style: italic;
          transform: translateY(-3px);
        }
      }

      &.main-nav {
        margin-left: auto;

        @media (min-width: $tablet_landscape) {
          --gap: #{$s3};
          padding-right: $s3;
        }

        @media (max-width: $tablet_landscape) {
          padding-right: $s2;
        }

        @media (max-width: $tablet_portrait) {
          display: none;
        }
      }

      &:not(.main-nav) {
        position: sticky;
        top: 0;
      }

      &.logo-nav {
        padding-bottom: $s-2;
        z-index: 102;

        &.open {
          color: $noir !important;
        }

        :global(svg) {
          height: 33px;
          width: auto;
        }

        @media (max-width: $tablet_portrait) {
          :global(svg) {
            height: 22px;
            width: auto;
          }
        }
      }

      &.menu-nav {
        &.open {
          z-index: 100;

          button {
            color: $noir;

            span {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }

        &:not(.open) button:not(.scrolled) {
          span {
            pointer-events: none;
          }
        }

        @media (max-width: $tablet_portrait) {
          margin-left: auto;
        }

        button {
          position: relative;
          z-index: 1;

          
          span {
            @media (min-width: $tablet_portrait) {
              margin-left: calc($s0 * -6);
            }
            transition: transform 333ms, opacity 333ms;
            opacity: 0;
            // transform: translateY(100%);
          }

          &.scrolled {
            span {
              opacity: 1;
              transform: translateY(0);
            }
          }

          :global(svg) {
            transition: transform 333ms;
          }

          &:hover,
          &:focus-visible {
            // span {
            //   font-style: italic;
            // }

            :global(svg) {
              transform: scale(1.25);
            }
          }

          @media (max-width: $tablet_portrait) {
            :global(svg) {
              height: 22px;
              width: auto;
            }
          }
        }

        dialog {
          position: fixed;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
</style>