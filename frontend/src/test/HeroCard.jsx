import { CardBody, CardContainer, CardItem } from "../components/ui/3d-cards";
import heroCardImg from '../assets/heroCard.jpeg'
export function HeroCard() {
  return (
    <CardContainer className="inter-var">
      <CardBody
        className="relative group/card  hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black border-white/[0.2]     h-auto rounded-xl  md:p-6 border"
      >
        <CardItem translateZ="100" className="w-full h-full mt-4">
          {/* Replace Image with img */}
          <img
            src={heroCardImg}
            height="1000"
            width="1000"
            className="h-64 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
       
      </CardBody>
    </CardContainer>
  );
}
