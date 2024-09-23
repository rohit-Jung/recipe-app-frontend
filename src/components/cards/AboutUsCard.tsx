import { FC } from "react";
import { Button } from "../ui/Button";

interface AboutUsCardProps {}

const AboutUsCard: FC<AboutUsCardProps> = () => {
  return (
    <>
      <div
        className="relative mt-16 bg-[url('https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center rounded-[3rem] w-full flex items-center  md:px-24 px-10 h-96 text-white py-12"
      >
        <div className="w-1/2 text-left h-full md:flex hidden justify-start items-end">
          <div className="h-1/4 rounded-md w-1/2 px-6 py-3 flex items-center bg-white">
            <h1 className="text-green-500 font-bold text-sm">
              50+ Quick food Recipies <br /> That's easy to do
            </h1>
          </div>
        </div>
        <div className="md:w-1/2 w-full text-black px-10 md:py-10 py-8 text-left bg-white rounded-3xl space-y-3 h-full">
          <h1 className="font-bold text-4xl">About Us</h1>
          <p className="md:text-lg text-base">
            Our recipes are the heart and soul of our culinary community, and
            they reflect our commitment to providing you with memorable and
            delightful dining experiences.
          </p>
          <Button className="text-base" variant={"default"}>
            Learn More
          </Button>
        </div>
      </div>
    </>
  );
};

export default AboutUsCard;
