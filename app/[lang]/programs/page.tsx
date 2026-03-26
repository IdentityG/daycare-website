import { getDictionary } from '@/get-dictionary'
import ProgramsHero from '@/components/programs/ProgramsHero'
import ProgramCategories from '@/components/programs/ProgramCategories'
import CurriculumApproach from '@/components/programs/CurriculumApproach'
import ProgramFacilities from '@/components/programs/ProgramFacilities'
import AdmissionSteps from '@/components/programs/AdmissionSteps'

export default async function ProgramsPage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="bg-white overflow-hidden">
      {/* 1. Hero */}
      <ProgramsHero dict={dict} />

      {/* 2. Interactive Program Grid */}
      <ProgramCategories dict={dict} />

      {/* 3. Curriculum & Philosophy Focus */}
      <CurriculumApproach dict={dict} />

      {/* 4. Environment & Facilities */}
      <ProgramFacilities dict={dict} />

      {/* 5. Admission & Enrollment */}
      <AdmissionSteps dict={dict} />
    </main>
  )
}
