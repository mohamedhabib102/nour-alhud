import GetAllSurahs from "@/components/quran/GetAllSurahs";
import CustomContainer from "@/ui/CustomContainer"
import CustomTitle from "@/ui/CustomTitle"





const Quran = () => {
    return (
        <section className="py-16">
            <CustomContainer>
             <CustomTitle
                 title="القرآن"
                 success={true}
                 description="تصفح سور وآيات القرآن الكريم، تعلّم معانيها، وتأمل في هدايتها وقيمتها الروحية لتعميق الصلة بالله"
             />
             <GetAllSurahs />
            </CustomContainer>
        </section>
    )
}
export default Quran;
