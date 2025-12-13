import CustomContainer from "@/ui/CustomContainer"
import CustomTitle from "@/ui/CustomTitle"
import { Quations } from "@/components/home"



const QuestionsPage: React.FC = () => {
    return (
        <section className="py-16">
            <CustomContainer>
                <CustomTitle
                    title="الأسئلة الشائعة"
                    success={true}
                    description="إذا لم تجد إجابة على سؤالك في هذه الصفحة، يمكنك الاتصال بنا مباشرة"
                />
                <Quations state="page"/>
            </CustomContainer>
        </section>
    )
}
export default QuestionsPage;