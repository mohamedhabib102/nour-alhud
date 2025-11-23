import CustomContainer from "@/ui/CustomContainer";
import CustomTitle from "@/ui/CustomTitle";


import type { Metadata } from "next";

interface Props {
  params: Promise<{
    surha: string;
  }>;
}

const getSurah = async (surahNumber: string) => {
  const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.asad`, {
    cache: "force-cache"
  })
  const data = await res.json()
  return data.data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const surah = await getSurah(resolvedParams.surha);

  return {
    title: `سورة ${surah.name} | القرآن الكريم`,
    description: `اقرأ آيات سورة ${surah.name} كاملة مكتوبة بالرسم العثماني مع التفسير.`,
    openGraph: {
      title: `سورة ${surah.name} | القرآن الكريم`,
      description: `اقرأ آيات سورة ${surah.name} كاملة مكتوبة بالرسم العثماني.`,
    },
  };
}

const SurhaPage: React.FC<Props> = async ({ params }) => {
  const resolvedParams = await params;
  const surahNumber = resolvedParams.surha;
  const surah = await getSurah(surahNumber);


  return (
    <section className="py-16">
      <CustomContainer>
        <div>
          <CustomTitle
            title="سور القرآن"
            success={true}
            description="تصفح سور القرآن الكريم، تعلّم معانيها، وتأمل في هدايتها وقيمتها الروحية لتعميق الصلة بالله"
          />
          <div className="mt-10">
            {surah.ayahs.map((ayah: any) => (
              <p className="cursor-pointer flex items-center gap-1.5 justify-start flex-row-reverse font-quran text-2xl text-right leading-12 mb-6 border-b-2 border-gray-100 dark:border-gray-800 pb-4 last:border-0 hover:text-[#0e582d] dark:hover:text-[#4ade80] transition-colors duration-200" key={ayah.number}>
                <span>{ayah.text}</span>
                <span className="inline-flex items-center justify-center w-10 h-10 relative mx-2 align-middle select-none">
                  <svg viewBox="0 0 40 40" className="absolute inset-0 w-full h-full" fill="none" stroke="currentColor">
                    <circle cx="20" cy="20" r="15" strokeWidth="2" />
                    <circle cx="20" cy="20" r="11" strokeWidth="1" opacity="0.5" />
                    <path d="M15 6 Q 17.5 2 20 6 Q 22.5 2 25 6" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M4 22 Q 1 20 4 18 M 36 22 Q 39 20 36 18" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span className="relative text-sm font-bold pt-1">{ayah.numberInSurah}</span>
                </span>
              </p>
            ))}
          </div>
        </div>
      </CustomContainer>
    </section>
  );
};

export default SurhaPage;
