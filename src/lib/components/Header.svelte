<script lang="ts">
  import type { TypeNavigationSkeleton } from '$lib/clients/content_types';
  import type { Entry } from 'contentful';
  import Icon from './Icon.svelte'

  let { navigation }: {
    navigation: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
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
  <nav class="logo-nav padded" bind:offsetHeight={headerHeight} class:scrolled={scrollY > innerHeight - (headerHeight / 2)}>
    <a href="/">
      <Icon icon="logo" label="Barrage Capital" />
    </a>
  </nav>
  <nav class="main-nav padded flex flex--gapped flex--middle">
    {#each navigation.fields.links as link}
      <a href={link.fields.destination} target={link.fields.external ? '_blank' : undefined}>{link.fields.label}</a>
    {/each}
  </nav>
  <nav class="padded" class:scrolled={scrollY > innerHeight - (headerHeight / 2)}>
    <button class="button--none" onclick={() => menuOpen = !menuOpen}>
      <Icon icon="menu" label="Menu" />
    </button>
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
      color: $blanc;
      width: auto;
      transition: color 666ms;
      position: relative;
      z-index: 99;

      &.scrolled {
        color: $noir;
      }

      &.logo-nav {
        padding-bottom: $s-2;
      }

      &.main-nav {
        margin-left: auto;
      }

      &:not(.main-nav) {
        position: sticky;
        top: 0;
        z-index: 100;
      }
    }
</style>