import Section from '@/components/layout/Section'
import Heading from '@/components/typography/Heading'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Content, isFilled } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Hero`.
 */
export type HeroProps = SliceComponentProps<Content.HeroSlice>

/**
 * Component for "Hero" Slices.
 */
const Hero = ({ slice, index }: HeroProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={cn(
        'lg:h-[calc(100vh-64px)] lg:min-h-[750px] text-primary-foreground relative',
        { 'bg-primary': slice.variation === 'default' }
      )}
    >
      {slice.variation === 'withImage' &&
        isFilled.image(slice.primary.image) && (
          <PrismicNextImage
            field={slice.primary.image}
            fallbackAlt=""
            fill
            sizes="100vw"
            className="z-[-2] hidden object-cover lg:block"
            priority={index === 0}
          />
        )}
      <div
        className={cn(
          'mx-auto my-8 flex max-w-screen-lg flex-col items-center justify-center rounded-lg p-3 lg:p-8 backdrop-blur',
          {
            'bg-primary/60': slice.variation === 'withImage',
          }
        )}
      >
        {isFilled.richText(slice.primary.heading) && (
          <PrismicRichText
            field={slice.primary.heading}
            components={{
              heading2: ({ children }) => (
                <Heading as="h2" size="6xl" className="text-primary-foreground">
                  {children}
                </Heading>
              ),
            }}
          />
        )}
        {isFilled.richText(slice.primary.description) && (
          <PrismicRichText
            field={slice.primary.description}
            components={{
              paragraph: ({ children }) => (
                <p className="text-primary-foreground max-w-prose my-3">
                  {children}
                </p>
              ),
            }}
          />
        )}
        {isFilled.link(slice.primary.button_link) && (
          <Button
            variant={slice.primary.button_style || 'default'}
            size="lg"
            className={cn('mt-4 lg:mt-8', {
              'bg-primary': slice.primary.button_style === 'outline',
              'text-primary-foreground': slice.primary.button_style === 'link',
            })}
          >
            {slice.primary.button_label || 'Missing Button Label'}
          </Button>
        )}
      </div>
    </Section>
  )
}

export default Hero
