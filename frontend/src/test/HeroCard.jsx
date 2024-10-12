import React from "react";
import { CardBody, CardContainer, CardItem } from "../components/ui/3d-cards";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import heroCardImg from '../assets/heroCard.jpeg'
export function HeroCard() {
  return (
    <CardContainer className="inter-var">
      <CardBody
        className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border"
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
