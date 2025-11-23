import Link from "next/link"



const getSurahs = async() => {
  const res = await fetch("https://api.alquran.cloud/v1/surah", {
    cache: "force-cache"
  })
  const data = await res.json()
  return data.data  
}

interface Surah {
  englishName: string;
  englishNameTranslation: string;
  name: string;
  number: number;
  numberOfAyahs: number;
  revelationType: string;
}



const GetAllSurahs: React.FC = async () => {
  const surahs = await getSurahs();

  return (
    <div dir="rtl">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {surahs.map((sur: Surah) => (
          <Link
            href={`/quran/${sur.number}`}
            key={sur.number}
            className="font-quran flex items-center justify-between bg-gray-100 dark:bg-gray-800 border-2 border-gray-400 dark:border-gray-600 p-4 rounded-lg
                    transition duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer hover:border-(--main-color)"

          >
            <div className="flex items-center gap-6">
              <div
                className="w-11 h-11 text-white flex justify-center items-center text-lg rounded-sm rotate-45"
                style={{ backgroundColor: "var(--main-color)" }}
              >
                <span className="-rotate-45">{sur.number}</span>
              </div>
              <h3 className="text-2xl">{sur.name}</h3>
            </div>
            <p className="text-lg"> آيات {sur.numberOfAyahs}</p>
          </Link>

        ))}
      </div>
    </div>
  )
}
export default GetAllSurahs