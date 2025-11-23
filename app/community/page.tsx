import { Posts } from "@/components/community";
import CustomContainer from "@/ui/CustomContainer"
import CustomTitle from "@/ui/CustomTitle"





const Community = () => {
    return (
        <section className="py-16">
            <CustomContainer>
                <CustomTitle
                    title="المجتمع"
                    success={true}
                    description=" مجتمع يتيح للأعضاء مشاركة مقالات وبوستات دينية، والنقاش والتفاعل في جو من الاحترام والتقوى، لتعميق الفهم ونشر القيم الروحية بطريقة آمنة وجميلة "
                />
                <Posts />
            </CustomContainer>
        </section>
    )
}
export default Community;
