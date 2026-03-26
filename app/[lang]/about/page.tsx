import { getDictionary } from '@/get-dictionary'
import AboutHero from '@/components/about/AboutHero'
import AboutHistory from '@/components/about/AboutHistory'
import AboutValues from '@/components/about/AboutValues'
import AboutTeam from '@/components/about/AboutTeam'
import Contact from '@/components/home/Contact'

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="bg-white overflow-hidden">
      {/* 1. Header Hero */}
      <AboutHero dict={dict} />

      {/* 2. History & Story */}
      <AboutHistory dict={dict} />

      {/* 3. Our Values */}
      <AboutValues dict={dict} />

      {/* 4. Meet the Team */}
      <AboutTeam dict={dict} />
    </main>
  )
}
