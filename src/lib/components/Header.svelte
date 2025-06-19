<script lang="ts">
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types';
  import type { Entry } from 'contentful';

  import Icon from './Icon.svelte'
  import Footer from './Footer.svelte'
  import { fly } from 'svelte/transition';

  let { navigations }: {
    navigations: { [key: string]: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS"> }
    // buttons: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
    // work: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
  } = $props()

  let scrollY = $state(0)
  let innerHeight = $state(1000)
  let headerHeight = $state(0)
  let lastScrollY = 0
  // let scrolled = $derived(scrollY > lastScrollY)
  let menuOpen = $state(false)

  $effect(() => {
    document.documentElement.classList.toggle('noscroll', menuOpen)
  })

  function onScroll() {
    lastScrollY = scrollY < 0 ? 0 : scrollY
  }

  function closeMenu() {
    menuOpen = false
  }
</script>

<svelte:window bind:scrollY bind:innerHeight onscroll={onScroll} />

<!-- <header class:scrolled={scrollY > innerHeight - (headerHeight / 2)} bind:offsetHeight={headerHeight} class="flex flex--middle"> -->
  <aside>
    <small>467.02 $ + 4.7% (Nov 29, 2024)</small>
  </aside>
  <nav class="logo-nav padded" class:open={menuOpen} bind:offsetHeight={headerHeight} class:scrolled={scrollY > innerHeight - (headerHeight / 2)}>
    <a href="/">
      <Icon icon="logo" label="Barrage Capital" />
    </a>
  </nav>
  <nav class="main-nav padded flex flex--gapped flex--middle">
    {#each navigations.main.fields.links as link}
      <a href={link.fields.destination} target={link.fields.external ? '_blank' : undefined}>{link.fields.label}</a>
    {/each}
  </nav>
  <nav class="menu-nav padded" class:open={menuOpen} class:scrolled={scrollY > innerHeight - (headerHeight / 2)}>
    <button class="button--none" onclick={() => menuOpen = !menuOpen}>
      {#if menuOpen}
        <Icon icon="close" label="Close" />
      {:else}
        <Icon icon="menu" label="Menu" />
      {/if}
    </button>
    {#if menuOpen}
    <dialog open transition:fly={{ x: '100%', opacity: 1, duration: 666 }}>
      <Footer navigations={navigations} />
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

  //   &.scrolled {
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
    }

    nav {
      width: auto;
      transition: color 666ms;
      position: relative;
      z-index: 99;
      
      a {
        transition: transform 333ms;

        &:hover,
        &:focus-visible {
          font-style: italic;
          transform: translateY(-3px);
        }
      }

      :global(body:has(> div > div > main > .hero:first-child)) & {
        color: $blanc;

        &.scrolled {
          color: $noir;
        }
      }

      &.main-nav {
        margin-left: auto;
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
      }

      &.menu-nav {
        
        &.open {

          button {
            color: $noir;
          }
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