import React from "react";

const PlanCard = ({ title, description, icon }) => {
  return (
    <>
      <div className=" flex md:flex-row flex-col items-center md:gap-2 gap-0  md:mx-0 mx-6 md:w-[400px] w-[300px] md:h-[200px] h-[350px] cursor-pointer border-2 border-[#ECFDFF08] main-card rounded-[20px] md:py-6 py-5 px-4">
        {/* img */}
        <div className="flex justify-center md:w-[500px] w-[600px] h-full">
        <img src={icon} alt="" width={100} height={100} className=" w-32" />
        </div>

        {/* content */}
        <div className=" flex flex-col gap-3">
        <h4 className="text-xl font-normal text-[#ECFDFF]">{title}</h4>
        <p className=" font-medium text-sm text-[#7979AC]">
            {description}
          </p>

        </div>
      </div>
    </>
  );
};

export default PlanCard;
