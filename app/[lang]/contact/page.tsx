import { getDictionary } from '@/get-dictionary'
import ContactHero from '@/components/contact/ContactHero'
import ContactFormSection from '@/components/contact/ContactFormSection'
import ContactFAQ from '@/components/contact/ContactFAQ'

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="bg-white overflow-hidden">
      {/* 1. Hero */}
      <ContactHero dict={dict} />

      {/* 2. Form & Info */}
      <ContactFormSection dict={dict} />

      {/* 3. FAQ */}
      <ContactFAQ dict={dict} />
    </main>
  )
}
