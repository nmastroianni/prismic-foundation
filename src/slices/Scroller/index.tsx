'use client'
import { Content, isFilled } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'
import * as React from 'react'
import { PrismicRichText } from '@/app/components/PrismicRichText'

/**
 * Props for `Scroller`.
 */
export type ScrollerProps = SliceComponentProps<Content.ScrollerSlice>

/**
 * Component for "Scroller" Slices.
 */
const Scroller = ({ slice }: ScrollerProps): JSX.Element => {
  React.useEffect(() => {
    const scrollers = document.querySelectorAll('.scroller')
    if (scrollers instanceof NodeList) {
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        scrollers.forEach(scroller => {
          scroller.setAttribute('data-animated', 'true')
          const scrollerInner = scroller.querySelector('.scroller__inner')
          if (scrollerInner) {
            const scrollerContent = Array.from(scrollerInner.children)
            scrollerContent.forEach(item => {
              const duplicatedItem = item.cloneNode(true) as Element
              duplicatedItem.setAttribute('aria-hidden', 'true')
              scrollerInner.appendChild(duplicatedItem)
            })
          }
        })
      }
    }
    return () => {
      // Cleanup function to remove aria-hidden attributes
      scrollers.forEach(scroller => {
        scroller.removeAttribute('data-animated')

        const scrollerInner = scroller.querySelector('.scroller__inner')
        if (scrollerInner) {
          const duplicatedItems = scrollerInner.querySelectorAll(
            '[aria-hidden="true"]',
          )
          duplicatedItems.forEach(item => {
            scrollerInner.removeChild(item)
          })
        }
      })
    }
  }, [])
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="scroller mx-auto my-8 max-w-screen-lg"
      data-speed={`${slice.primary.speed?.toLowerCase()}`}
      data-direction={`${slice.primary.scroll_direction ? 'right' : 'left'}`}
    >
      {isFilled.richText(slice.primary.heading) && (
        <PrismicRichText
          field={slice.primary.heading}
          components={{
            heading2: ({ children }) => (
              <h2 className="mb-4 mt-6 text-center font-outfit text-5xl font-bold text-skin-primary">
                {children}
              </h2>
            ),
          }}
        />
      )}
      <ul className="scroller__inner relative flex flex-wrap gap-4 py-4">
        {slice.items.length > 0 &&
          slice.items.map(item => (
            <li key={item.image.url}>
              <PrismicNextImage
                field={item.image}
                fallbackAlt=""
                className="h-[300px] w-[400px]"
              />
            </li>
          ))}
      </ul>
    </section>
  )
}

export default Scroller
