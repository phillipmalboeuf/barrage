<script lang="ts">
  import { isTypeNavigation, isTypeText, type TypeNavigationSkeleton } from '$lib/clients/content_types'
  import type { Entry } from 'contentful'
  import { onMount } from 'svelte'

  let { item, index }: { item: Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">, index: number } = $props()
</script>


<div class="documents flex flex--gapped flex--spaced index-{index}">
  {#if item.fields.links}
  <div class="links flex flex--gapped">
    {#each item.fields.links as link}
    <div class="link">
      <a class="flex flex--column flex--spaced" href={link.fields.asset ? link.fields.asset.fields.file.url : link.fields.destination} target={(link.fields.external || link.fields.asset) ? '_blank' : undefined} download={link.fields.asset ? link.fields.asset.fields.file.fileName : undefined}>
        {#if link.fields.asset}
        <svg width="60" height="73" viewBox="0 0 60 73">
        <path d="M60 51.9229H39.2305V72.6924H0V0H60V51.9229ZM7.04785 7.97852V19.6152H8.80371V15.5244H11.1895C12.091 15.5244 12.8399 15.3598 13.4346 15.0303C14.0329 14.697 14.48 14.2458 14.7754 13.6777C15.0746 13.1058 15.2236 12.4619 15.2236 11.7461C15.2236 11.034 15.0767 10.3934 14.7812 9.8252C14.4858 9.25328 14.04 8.80315 13.4453 8.47363C12.8506 8.14411 12.1006 7.97852 11.1953 7.97852H7.04785ZM17.2822 7.97852V19.6152H21.0488C22.2306 19.6152 23.2389 19.3819 24.0723 18.916C24.9054 18.4463 25.5421 17.7763 25.9814 16.9053C26.4246 16.0341 26.6455 14.9923 26.6455 13.7803C26.6455 12.5719 26.4257 11.5355 25.9863 10.6719C25.5508 9.80473 24.9244 9.13978 24.1064 8.67773C23.2883 8.21187 22.3089 7.97856 21.1689 7.97852H17.2822ZM28.8291 7.97852V19.6152H30.585V14.541H35.5283V13.0361H30.585V9.49023H36.0449V7.97852H28.8291ZM21.0605 9.5127C21.909 9.5127 22.6194 9.67827 23.1914 10.0078C23.7632 10.3373 24.1936 10.8198 24.4814 11.4561C24.7731 12.0924 24.9189 12.8674 24.9189 13.7803C24.9189 14.7006 24.7731 15.481 24.4814 16.1211C24.1898 16.7574 23.7501 17.2439 23.1631 17.5811C22.5761 17.9143 21.8393 18.081 20.9531 18.0811H19.0381V9.5127H21.0605ZM11.0078 9.48438C11.5911 9.48438 12.0609 9.58129 12.417 9.77441C12.7767 9.96754 13.0404 10.2344 13.207 10.5752C13.3737 10.9161 13.457 11.3067 13.457 11.7461C13.457 12.1853 13.3736 12.5773 13.207 12.9219C13.0404 13.2666 12.7789 13.5395 12.4229 13.7402C12.0669 13.9372 11.603 14.0361 11.0312 14.0361H8.80371V9.48438H11.0078Z" fill="currentColor"/>
        <path d="M60.0001 55.3846H42.6924V72.6923L60.0001 55.3846Z" fill="currentColor"/>
        </svg>
        {:else if link.fields.destination}
        <svg width="79" height="67" viewBox="0 0 79 67">
        <path d="M28 63.5178V66.5178H51V63.5178C48.5 63.5178 46 61.0178 46 58.5178V53.0178H33V58.5178C33 61.0178 30.5 63.5178 28 63.5178Z" fill="currentColor"/>
        <path d="M79 49.5177H0V0.517731H79V49.5177ZM7.51172 9.32535L10.7383 20.9621H12.5117L14.96 12.2462H15.0508L17.5 20.9621H19.2666L22.5 9.32535H20.6475L18.3867 18.3429H18.2783L15.9199 9.32535H14.0908L11.7324 18.3371H11.625L9.35742 9.32535H7.51172ZM23.1523 9.32535L26.3789 20.9621H28.1523L30.6006 12.2462H30.6914L33.1406 20.9621H34.9072L38.1406 9.32535H36.2881L34.0273 18.3429H33.9189L31.5605 9.32535H29.7314L27.373 18.3371H27.2656L24.998 9.32535H23.1523ZM38.793 9.32535L42.0195 20.9621H43.793L46.2412 12.2462H46.332L48.7812 20.9621H50.5479L53.7812 9.32535H51.9287L49.668 18.3429H49.5596L47.2012 9.32535H45.3721L43.0137 18.3371H42.9062L40.6387 9.32535H38.793Z" fill="currentColor"/>
        </svg>
        {/if}

        {link.fields.label}
      </a>
    </div>
    {/each}
  </div>
  {/if}

  {#if item.fields.title}
  <h5>{item.fields.title}</h5>
  {/if}
</div>


<style lang="scss">
  .documents {
    width: 100%;
    padding: $s1;
    border-radius: $radius;
    background-color: $beige;

    &.index-1 {
      color: $blanc;
      background-color: $vert;
    }

    &.index-2 {
      color: $blanc;
      background-color: $bleu;
    }

    .links {
      width: auto;

      .link {
        a {
          border: 1px solid;
          border-radius: $radius;
          padding: $s0;
          width: 180px;
          aspect-ratio: 1 / 1.2;
        }
      }
    }
  }
</style>