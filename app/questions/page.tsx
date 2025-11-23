import CustomContainer from "@/ui/CustomContainer"
import CustomTitle from "@/ui/CustomTitle"
import AllQuestions from "@/components/questions/AllQuestions"



const QuestionsPage: React.FC = () => {
    return (
        <section className="py-16">
            <CustomContainer>
                <CustomTitle
                    title="الأسئلة الشائعة"
                    success={true}
                    description="إذا لم تجد إجابة على سؤالك في هذه الصفحة، يمكنك الاتصال بنا مباشرة"
                />
                <AllQuestions />
            </CustomContainer>
        </section>
    )
}
export default QuestionsPage;