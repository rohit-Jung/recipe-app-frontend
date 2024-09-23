import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { Rating } from "@mui/material";
import { useState } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";

interface CommentCardProps {
  text: string;
  name: string;
  image: string;
}
export function CommentCard({ text, name, image }: CommentCardProps) {
  const [heartFill, setHeartFill] = useState(false);
  return (
    <CardContainer className="inter-var w-56 h-44 ">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-3 border  ">
        <CardItem translateZ="30" className="w-full">
          <div className="bg-gray-300 rounded-md p-3 text-left h-32 w-56 ">
            <Rating value={3} />
            <p className="line-clamp-3">{text}</p>
          </div>
        </CardItem>
        <div className="flex justify-between items-center mt-1">
          <CardItem
            translateZ="30"
            className="mt-4 size-8 bg-red-500  rounded-full overflow-hidden "
          >
            <img
              src={
                image.length > 0
                  ? image
                  : "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              className="w-full h-full object-center object-cover group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <CardItem
            as="p"
            translateZ="30"
            className="text-black text-xl font-bold flex items-center justify-between gap-6 w-[60%] max-w-sm mr-3 dark:text-neutral-300"
          >
            <span>{name}</span>

            {!heartFill ? (
              <BsHeart
                onClick={() => setHeartFill(!heartFill)}
                className="cursor-pointer"
              />
            ) : (
              <BsHeartFill
                onClick={() => setHeartFill(!heartFill)}
                className="cursor-pointer"
              />
            )}
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
