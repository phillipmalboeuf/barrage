<script lang="ts">
  import type { TypeFormSkeleton, TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'

  import { fly } from 'svelte/transition'
  import { onNavigate } from '$app/navigation'

  import Icon from './Icon.svelte'
  import Footer from './Footer.svelte'
  
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
  let lastScrollY = 0
  let menuOpen = $state(false)

  $effect(() => {
    if (menuOpen && scrollY < 45) {
      window.scrollTo({ top: 45, behavior: 'instant' })
    }
    document.documentElement.classList.toggle('noscroll', menuOpen)
  })

  function onScroll() {
    lastScrollY = scrollY < 0 ? 0 : scrollY
  }

  onNavigate(() => {
    menuOpen = false
  })
</script>

<svelte:window bind:scrollY bind:innerHeight onscroll={onScroll} />

<!-- <header bind:offsetHeight={headerHeight} class="flex flex--middle"> -->
  <aside>
    <small>467.02 $ + 4.7% (Nov 29, 2024)</small>
  </aside>
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
    <button class="button--none" aria-controls="menu" aria-expanded={menuOpen ? 'true' : 'false'} onclick={() => menuOpen = !menuOpen}>
      {#if menuOpen}
        <Icon icon="close" label="Close" />
      {:else}
        <Icon icon="menu" label="Menu" />
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
      z-index: 99;

      color: $noir;

      &.dark {
        color: $blanc;
      }
      
      a {
        transition: transform 333ms;

        &:hover,
        &:focus-visible {
          font-style: italic;
          transform: translateY(-3px);
        }
      }

      &.main-nav {
        margin-left: auto;

        @media (max-width: $tablet_portrait) {
          display: none;
        }
      }

      &:not(.main-nav) {
        position: sticky;
        top: 0;
        z-index: 100;
      }

      &.logo-nav {
        padding-bottom: $s-2;
        z-index: 102;

        &.open {
          color: $noir !important;
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

          button {
            color: $noir;
          }
        }

        @media (max-width: $tablet_portrait) {
          margin-left: auto;
        }

        button {
          position: relative;
          z-index: 101;

          :global(svg) {
            transition: transform 333ms;
          }

          &:hover,
          &:focus-visible {
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
          z-index: 100;
        }
      }
    }
</style>