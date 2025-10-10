<script lang="ts">
  import type { Asset } from 'contentful'

  let {
    media,
    mobileMedia,
    alt,
    width = 1666,
    ar = undefined,
    focalPoint = undefined,
    eager = false,
    noCaption = false
  }: {
    media: Asset<"WITHOUT_UNRESOLVABLE_LINKS">,
    mobileMedia?: Asset<"WITHOUT_UNRESOLVABLE_LINKS">,
    alt?: string,
    width?: number,
    ar?: number,
    focalPoint?: { x: number, y: number },
    eager?: boolean,
    noCaption?: boolean
  } = $props()

  function getNormalizedFocalPoint(fp: { x: number, y: number }, width: number, height: number) {
    return {
      x: fp.x / width,
      y: fp.y / height
    }
  }

  const normalizedFP = $derived(focalPoint ? getNormalizedFocalPoint(focalPoint, media.fields.file.details.image.width, media.fields.file.details.image.height) : undefined)

  function cdn(url: string) {
    return url
  }
</script>

<picture>
  <source srcSet="{cdn(mobileMedia ? mobileMedia.fields.file.url : media.fields.file.url)}?w={Math.round(width * 0.333)}{ar ? `&fit=fill&h=${Math.round(width * 0.333 * ar)}` : ''}" media="(max-width: 600px)" />
  <source srcSet="{cdn(media.fields.file.url)}?w={Math.round(width * 0.666)}{ar ? `&fit=fill&h=${Math.round(width * 0.666 * ar)}` : ''}" media="(max-width: 1200px)" />
  <source srcSet="{cdn(media.fields.file.url)}?w={Math.round(width * 1.333)}{ar ? `&fit=fill&h=${Math.round(width * 1.333 * ar)}` : ''}" media="(min-width: 1500px)" />
  <img src="{cdn(media.fields.file.url)}?w={width}{ar ? `&fit=fill&h=${Math.round(width * ar)}` : ''}"
    style:--ar={ar ? `${width} / ${Math.round(width * ar)}` : `${media.fields.file.details.image.width} / ${media.fields.file.details.image.height}`}
    style:--mobile-ar={(!ar && mobileMedia) ? `${mobileMedia.fields.file.details.image.width} / ${mobileMedia.fields.file.details.image.height}` : undefined}
    style:--fp-x={normalizedFP ? `${normalizedFP.x * 100}%` : '50%'}
    style:--fp-y={normalizedFP ? `${normalizedFP.y * 100}%` : '50%'}
    alt="{alt || media.fields.title}" loading={eager ? "eager" : "lazy"} />
</picture>

<style lang="scss">
  picture {

    img {
      aspect-ratio: var(--ar);
      object-position: var(--fp-x) var(--fp-y);
      object-fit: cover;
    }
  }
</style>