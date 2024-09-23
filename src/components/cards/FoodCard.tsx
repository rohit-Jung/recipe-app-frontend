import { FC } from "react";
import { Rating } from "@mui/material";
import { FaClock } from "react-icons/fa";
import { TbAntennaBars5 } from "react-icons/tb";
import { PinContainer } from "../ui/3d-pin";
import { Badge } from "../ui/badge";

interface FoodCardProps {
  image: string;
  name: string;
  ratings: number;
  tags: string[];
  difficulty: string;
  prepTime: string;
  link: string;
}

const FoodCard: FC<FoodCardProps> = ({
  image,
  name,
  ratings,
  tags,
  difficulty,
  prepTime,
  link,
}) => {
  return (
    <>
      <PinContainer
        title={name}
        href={link}
        containerClassName="md:w-[275px] w-full md:h-[230px] h-auto dark:bg-gray-700 rounded-t-3xl rounded-bl-3xl mb-14"
      >
        <div className="bg-slate-50 md:w-[275px] w-[65vw] shadow-inner  overflow-hidden pb-3">
          <div className="relative  h-[200px]">
            <img src={image} alt="" className="object-cover w-full h-full " />
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-evenly gap-3 px-2 py-3 text-green-600 gap-y-1 bg-white bg-opacity-90">
              <div className="flex items-center justify-center gap-2">
                <FaClock />
                <h3 className="text-base font-bold">{prepTime}</h3>
              </div>
              <div className="flex font-bold items-center justify-center gap-2">
                <TbAntennaBars5 size={24} />
                <h3 className="text-base font-bold">{difficulty}</h3>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-start justify-center pl-2 ">
            <h1 className="font-semibold truncate text-xl max-w-64">{name}</h1>
            <Rating value={ratings} readOnly />
            <span className="text-sm ">
              {tags.map((tag) => <Badge key={tag} className="bg-orange-500 mr-1 mt-1">{tag}</Badge>)}
            </span>
          </div>
        </div>
      </PinContainer>
    </>
  );
};

export default FoodCard;
