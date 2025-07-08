import React, { useRef } from "react";
import PlanCard from "./PlanCard";
import Globe from "../../../assets/svgs/Globe.svg";
import Liquidity from "../../../assets/svgs/Liquidityy.svg";
import Gear from "../../../assets/svgs/Gear.svg";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const cardData = [
  {
    id: 1,
    title: "Order Book AMM",
    description:
      "Solena's AMM seamlessly integrates with OpenBook's central limit order book, granting pools access to all order flow and liquidity while enabling reciprocal interaction.",
    icon: Gear,
  },
  {
    id: 2,
    title: "Best Price Swaps",
    description:
      "Solena algorithmically determines the optimal swap route across all available pools, ensuring users receive the best price possible, and executes transactions accordingly.",
    icon: Globe,
  },
  {
    id: 3,
    title: "Premissionless Liquidity",
    description:
      "Solena facilitates the seamless creation of liquidity pools and farms, empowering projects to inaugurate and nurture liquidity in a decentralized manner, without the need for permission.",
    icon: Liquidity,
  },
];

const StrategyPlan = () => {
  const scrollRef = useRef(null);

  const scroll = (scrollOffset) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += scrollOffset;
    }
  };

  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down("md"));

  const arrowStyle = {
    fontSize: "18px",  // Adjust the size to make the arrows thinner
    color: "#539EE1",
    cursor: "pointer",
  };

  return (
    <>
      <section className="w-[95%] flex flex-col justify-center items-center gap-10 mt-1 mx-auto relative -top-20">
        {/* Heading */}
        <div className="flex flex-col gap-5 justify-center items-center">
          <hr
            className="w-10 ml-[6px]"
            style={{
              height: "3px",
              borderWidth: 0,
              backgroundColor: "#3ED3B5",
              color: "transparent",
            }}
          />
          <h2 className="font-extrabold md:text-7xl text-6xl heading pb-4">
            Strategy
          </h2>
          <h3 className="font-light text-4xl text-[#ECFDFF]">
            & Project Plan
          </h3>
        </div>

        {/* Cards section */}
        <div
          className="md:w-full w-[90%] overflow-x-scroll flex md:justify-center justify-start items-center md:gap-8 mx-auto scrollbarHide scroll-smooth transition-all duration-200 ease-in-out"
          ref={scrollRef}
          style={{ scrollBehavior: "smooth" }}
        >
          <div className="hidden md:block mr-24"></div>
          {cardData.map((item, i) => (
            <PlanCard key={i} {...item} />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-5">
          {/* Left arrow */}
          <svg
            width="32"
            height="10"
            viewBox="0 0 32 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={arrowStyle}
            onClick={() => scroll(downMd ? -310 : -400)}
            className="cursor-pointer"
          >
            <path
              d="M1 5L31 5M1 5L5 1M1 5L5 9"
              stroke="#7979AC"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Right arrow */}
          <svg
            width="32"
            height="10"
            viewBox="0 0 32 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={arrowStyle}
            onClick={() => scroll(downMd ? 310 : 400)}
            className="cursor-pointer"
          >
            <path
              d="M31 5L1 5M31 5L27 9M31 5L27 1"
              stroke="#7979AC"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>
    </>
  );
};

export default StrategyPlan;
