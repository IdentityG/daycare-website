import { getDictionary } from '@/get-dictionary'
import Hero from '@/components/Hero'
import Philosophy from '@/components/Philosophy'
import Programs from '@/components/Programs'
import Features from '@/components/Features'
import Timeline from '@/components/Timeline'

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="bg-white overflow-hidden">
      <Hero dict={dict} />
      <Philosophy dict={dict} />
      <Programs dict={dict} />
      <Features dict={dict} />
      <Timeline dict={dict} />
      
      {/* Space for the final Sections (Testimonials & Footer) */}
      <div className="h-64 bg-white flex items-center justify-center"></div> 
    </main>
  )
}