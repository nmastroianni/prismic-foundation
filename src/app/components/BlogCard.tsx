import React from 'react'
import { cn } from '@/app/lib/cn'
import { BlogPostDocument } from '../../../prismicio-types'
import Link from 'next/link'
import { PrismicNextImage } from '@prismicio/next'
import { isFilled } from '@prismicio/client'
import Heading from './Heading'
import { PrismicRichText } from './PrismicRichText'

type BlogCardProps = {
  as?: React.ElementType
  className?: string
  blog_post: BlogPostDocument
}

export default function BlogCard({
  as: Comp = 'li',
  blog_post,
  className,
  ...restProps
}: BlogCardProps) {
  return (
    <Comp
      className={cn(
        'my-8 block overflow-hidden rounded-lg border border-skin-secondary lg:my-12',
        className,
      )}
      {...restProps}
    >
      <article className="grid grid-rows-2">
        {isFilled.image(blog_post.data.featured_image) && (
          <div className="relative h-52 overflow-hidden">
            <Link href={`${blog_post.url}`}>
              <PrismicNextImage
                field={blog_post.data.featured_image}
                className="transition duration-700 ease-in-out hover:scale-110"
                fallbackAlt=""
              />
            </Link>
          </div>
        )}
        <div className="relative p-4">
          <PrismicRichText
            field={blog_post.data.title}
            components={{
              heading1: ({ children }) => (
                <Heading as="h1" size="3xl" className="text-left">
                  {children}
                </Heading>
              ),
            }}
          />
          <p className="mb-4">{blog_post.data.excerpt}</p>
          <Link
            href={`${blog_post.url}`}
            className="hover:text-color-neutral hover:shadow-color-accent inline-block rounded bg-skin-button-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-skin-base transition duration-150 ease-in hover:bg-skin-button-primary-hover hover:shadow"
          >
            Continue Reading
          </Link>
        </div>
      </article>
    </Comp>
  )
}
