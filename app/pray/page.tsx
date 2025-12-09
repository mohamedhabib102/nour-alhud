import ParyFC from "@/components/Pary/ParyFC"
import CustomContainer from "@/ui/CustomContainer"
import CustomTitle from "@/ui/CustomTitle"





const ParyPage: React.FC = () => {
    return(
        <section className="py-16">
            <CustomContainer>
              <CustomTitle
                  success={false}
                  title="التسبيح"
                  description="صفحة مخصصة للتسبيح وذكر الله، تساعدك على المواظبة على الذكر اليومي بطريقة سهلة ومريحة."
              />
              <ParyFC />
            </CustomContainer>
        </section>
    )
}
export default ParyPage