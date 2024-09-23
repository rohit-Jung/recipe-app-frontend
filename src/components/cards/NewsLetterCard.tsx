import { FC } from "react";
import { Button } from "../ui/Button";

interface NewsLetterCardProps {}

const NewsLetterCard: FC<NewsLetterCardProps> = () => {
  return (
    <>
      <div className="relative mt-16 rounded-[3rem] w-full flex items-center  bg-black md:px-24 px-10 h-72 text-white py-5">
        <div className="md:w-[50%] w-full text-left h-full flex flex-col py-10 justify-between">
          <h1 className="md:text-5xl text-2xl font-bold">Want exciting recipes ?</h1>
          <p className="text-2xl font-semibold">Subscribe to our news letter</p>
          <div className="flex text-black items-center justify-between shadow-inner bg-white py-2 px-6 rounded-xl">
            <input
              className="focus:outline-none outline-none w-full h-full"
              placeholder="Type your email"
            />
            <Button>Subscribe</Button>
          </div>
        </div>
        <div className="absolute right-16 -bottom-10 md:flex hidden ">
          <img src="/women_cooking.svg" alt="" className="" />
        </div>
      </div>
    </>
  );
};

export default NewsLetterCard;
