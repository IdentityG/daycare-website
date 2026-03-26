import { getDictionary } from '@/get-dictionary'
import Hero from '@/components/home/Hero'
import Philosophy from '@/components/home/Philosophy'
import Programs from '@/components/home/Programs'
import Features from '@/components/home/Features'
import Timeline from '@/components/home/Timeline'
import Testimonials from '@/components/home/Testimonials'
import Contact from '@/components/home/Contact'

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="bg-white overflow-hidden">
      {/* 1. Hero Section */}
      <Hero dict={dict} lang={lang} />

      {/* 2. Philosophy & About */}
      <Philosophy dict={dict} />

      {/* 3. Core Programs (Horizontal Scroll) */}
      <Programs dict={dict} />

      {/* 4. Why Choose Us (3D Grid) */}
      <Features dict={dict} lang={lang} />

      {/* 5. A Day in the Life (Interactive Scroll Line) */}
      <Timeline dict={dict} />

      {/* 6. Testimonials (Infinite Marquee) */}
      <Testimonials dict={dict} />

      {/* 7. Contact & Footer */}
      <Contact dict={dict} />
    </main>
  )
}