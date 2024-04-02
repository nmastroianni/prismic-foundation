import Section from '@/components/layout/Section'
import Heading from '@/components/typography/Heading'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Content, asText, isFilled } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Features`.
 */
export type FeaturesProps = SliceComponentProps<Content.FeaturesSlice>

/**
 * Component for "Features" Slices.
 */
const Features = ({ slice }: FeaturesProps): JSX.Element => {
  return (
    <Section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      width="xl"
      className={cn('py-8 lg:pb-24', {})}
    >
      {isFilled.richText(slice.primary.heading) && (
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <Heading
                as="h2"
                size="5xl"
                className="py-4 lg:py-8 lg:text-center"
              >
                {children}
              </Heading>
            ),
          }}
        />
      )}
      {isFilled.richText(slice.primary.description) && (
        <div className="max-w-prose mx-auto">
          <PrismicRichText field={slice.primary.description} />
        </div>
      )}
      <div className="mt-8 flex flex-wrap justify-evenly gap-4 lg:mt-0 lg:gap-4">
        {slice.items.length > 0 &&
          slice.items.map((item, index) => {
            if (isFilled.richText(item.feature_heading)) {
              return (
                <Card
                  key={slice.id + index}
                  className={cn('w-[350px]', {
                    'bg-secondary': slice.variation === 'default',
                  })}
                >
                  <CardHeader>
                    <PrismicRichText
                      field={item.feature_heading}
                      components={{
                        heading3: ({ children }) => (
                          <Heading as="h3" size="3xl">
                            {children}
                          </Heading>
                        ),
                      }}
                    />
                  </CardHeader>
                  <CardContent>
                    {isFilled.richText(item.feature_description) && (
                      <PrismicRichText field={item.feature_description} />
                    )}

                    {isFilled.link(item.button_link) && (
                      <CardFooter className="flex justify-center">
                        <Button
                          variant={'default'}
                          asChild
                          className="mt-4 lg:mt-8"
                        >
                          <PrismicNextLink field={item.button_link}>
                            {item.button_label || 'Missing Label'}{' '}
                            <span className="sr-only">
                              About {asText(item.feature_heading)}
                            </span>
                          </PrismicNextLink>
                        </Button>
                      </CardFooter>
                    )}
                  </CardContent>
                </Card>
              )
            } else return null
          })}
      </div>
    </Section>
  )
}

export default Features
