<script lang="ts">
  import { onMount } from 'svelte'
  import type { Entry } from 'contentful'
  
  import { isTypeGrid, isTypeHero, isTypeList, isTypeText, type TypeTextSkeleton } from '$lib/clients/content_types'
  import Hero from '$lib/components/Hero.svelte'
  import Text from '$lib/components/Text.svelte'
  import List from '$lib/components/List.svelte'
  import Grid from '$lib/components/Grid.svelte'
  
  import { headerState } from '$lib/stores/header.svelte'

  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()

  let elements: HTMLElement[] = $state([])

  onMount(() => {
    const checkHeaderOverlap = () => {
      if (!headerState.element) return
      
      const headerRect = headerState.element.getBoundingClientRect()
      const headerBottom = headerRect.bottom
      
      // Find which element the header is currently overlapping
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i]
        if (!element) continue
        
        const elementRect = element.getBoundingClientRect()
        
        // Check if header bottom is within this element's bounds
        if (headerBottom >= elementRect.top && headerBottom <= elementRect.bottom) {
          if (element.classList.contains('hero')) {
            headerState.dark = true
          } else {
            headerState.dark = false
          }

          return
        }
      }

      headerState.dark = false
    }
    
    // Check on scroll
    const handleScroll = () => {
      checkHeaderOverlap()
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Initial check
    checkHeaderOverlap()
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  })
  
  // $effect(() => {
  //   if (!heroElement || !headerState.element) return
    
  //   const checkIntersection = () => {
  //     const heroRect = heroElement.getBoundingClientRect()
  //     const headerRect = headerState.element!.getBoundingClientRect()
      
  //     // Check if hero bottom touches header top
  //     const isIntersecting = heroRect.bottom >= headerRect.top && heroRect.top <= headerRect.bottom
      
  //     console.log('Hero bottom:', heroRect.bottom, 'Header top:', headerRect.top, 'Intersecting:', isIntersecting)
      
  //     headerState.dark = isIntersecting
  //   }
    
  //   // Check on scroll
  //   const handleScroll = () => {
  //     checkIntersection()
  //   }
    
  //   window.addEventListener('scroll', handleScroll, { passive: true })
    
  //   // Initial check
  //   checkIntersection()
    
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // })
</script>

{#if data.page.fields.content?.length}
{#each data.page.fields.content as item, i (item.sys.id)}
<section class="{item.sys.contentType.sys.id}" bind:this={elements[i]}>
  {#if isTypeHero(item)}
  <Hero {item} />
  {:else if isTypeText(item)}
  <Text {item} />
  {:else if isTypeList(item)}
  <List list={item} />
  {:else if isTypeGrid(item)}
  <Grid grid={item} />
  {/if}
</section>
{/each}
{/if}


<style lang="scss">
  section {
    margin: $s7 0;

    &.hero:first-child {
      margin-top: -130px;

      @media (max-width: $tablet_portrait) {
        margin-top: -90px;
      }
    }

    &.hero + &.hero {
      margin-top: calc($s7 * -1);
    }
  }
</style>