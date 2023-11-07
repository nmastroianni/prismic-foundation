'use client'
import { PrismicNextLink } from '@prismicio/next'
import Link from 'next/link'
import Section from '@/app/components/Section'
import { SettingsDocument } from '../../../prismicio-types'
// import Logo from '@/app/components/Logo'

export default function Navbar({ data }: SettingsDocument) {
  const { navigation } = data
  return (
    <Section
      as="header"
      className="shadow-skin-neutral z-10 py-4 shadow-sm md:py-4 lg:py-6"
    >
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between">
        <Link href="/">
          <h1>LOGO</h1>
          <span className="sr-only">Return to Homepage</span>
        </Link>
        <nav>NAVIGATION</nav>
      </div>
    </Section>
  )
}
