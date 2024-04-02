import { cn } from '@/lib/utils'
import { createClient } from '@/prismicio'
import { ImageField, SelectField, asText, isFilled } from '@prismicio/client'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import Link from 'next/link'
import { PostDocument } from '../../../prismicio-types'
import Pagination from '@/components/layout/Pagination'
import { PrismicRichText } from '@/components/typography/PrismicRichText'
import { Button, buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import Heading from '../typography/Heading'

type ContentListProps = {
  contentType: SelectField
  page: number | undefined
  display: number | undefined
  ctaText?: string
  fallbackItemImage: ImageField
}

const ContentList = async ({
  contentType,
  ctaText = 'Read More',
  display = 5,
  fallbackItemImage,
  page = 1,
}: ContentListProps): Promise<JSX.Element> => {
  const client = createClient()
  let prismicData

  prismicData = await client.getByType('post', {
    orderings: {
      field: 'document.first_publication_date',
      direction: 'desc',
    },
    page: page,
    pageSize: display,
  })

  const { results } = prismicData

  return (
    <>
      <ul>
        {results.length > 0 &&
          results.map((item) => {
            return (
              <li
                key={item.id}
                className="grid lg:grid-cols-5 border-t border-t-secondary py-10 group"
              >
                <div className="flex justify-center items-center lg:-mr-4 lg:col-span-2 group-hover:lg:translate-x-2 transition duration-300 ease-in-out">
                  <Link href={item.url || '#'}>
                    <PrismicNextImage
                      field={
                        item.data.featured_image.url
                          ? item.data.featured_image
                          : fallbackItemImage
                      }
                      className="rounded-lg"
                    />
                  </Link>
                </div>
                <Card className="lg:col-span-3 lg:-ml-4 bg-background/80 backdrop-blur group-hover:lg:-translate-x-2 transition duration-300 ease-in-out">
                  <CardHeader>
                    <PrismicRichText
                      field={item.data.title}
                      components={{
                        heading1: ({ children }) => (
                          <Heading as="h2" size="3xl">
                            {children}
                          </Heading>
                        ),
                      }}
                    />
                  </CardHeader>
                  <CardContent>
                    <PrismicRichText field={item.data.excerpt} />
                  </CardContent>
                  <CardFooter>
                    <Button asChild>
                      <Link
                        href={item.url || '#'}
                        aria-label={
                          asText(item.data.title) || 'View the content'
                        }
                      >
                        {ctaText}
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </li>
            )
          })}
      </ul>
      {prismicData.total_pages > 1 && (
        <Pagination
          hasNextPage={prismicData?.next_page !== null}
          hasPrevPage={prismicData?.prev_page !== null}
          totalPages={prismicData?.total_pages}
        />
      )}
    </>
  )
}

export default ContentList
