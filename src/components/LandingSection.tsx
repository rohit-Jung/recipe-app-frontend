import { FC } from "react";
import { Input } from "@/components/ui/input";
import { TypewriterEffect } from "./ui/typewriter-effect";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { CommentCard } from "./cards/CommentCard";
import { useNavigate } from "react-router-dom";

interface LandingSectionProps {}

const LandingSection: FC<LandingSectionProps> = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="h-full py-10 w-full relative z-40 flex items-center justify-between">
        <div className="md:w-1/2 w-full h-full ">
          <section className="info md:w-[90%] md:pl-2 px-12 w-full">
            <div className="flex items-start justify-center gap-3 flex-col text-left">
              <h1 className="text-6xl md:text-8xl  font-bold font-[Aladin] ">
                Discover your{" "}
                <TypewriterEffect
                  words={[
                    { text: "Inner ", className: "text-6xl md:text-8xl" },
                    {
                      text: "Chef ",
                      className: "text-[#F79F1A] text-6xl md:text-8xl",
                    },
                    { text: "with ", className: " text-6xl md:text-8xl" },
                    {
                      text: "us",
                      className: "text-[#F79F1A] text-6xl md:text-8xl",
                    },
                    {
                      text: " !",
                      className: "text-[#F79F1A] text-6xl md:text-8xl",
                    },
                  ]}
                  className="text-10xl w-[90%] text-left font-bold font-[Aladin]"
                  cursorClassName=" "
                />
              </h1>

              <TextGenerateEffect
                words="Explore a world of flavors with our vast collection of recipes, meticulously curated to cater to every taste and occasion. From quick weeknight dinners to extravagant weekend feasts, our step-by-step guides and video tutorials success every time you cook."
                className="text-sm"
                duration={0.01}
                filter={false}
              />
              <div
                onClick={() => navigate("/recipes")}
                className="flex w-full items-center justify-center gap-3 mt-3 h-16 py-2 "
              >
                <Input
                  className="h-full shadow-inner text-black"
                  placeholder="Search For More Recipes"
                />
                <div className="h-full md:w-1/3 w-full rounded-md  inline-flex bg-[#F79F1A] items-center justify-center whitespace-nowrap text-sm font-medium ">
                  Explore Now
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="relative md:flex hidden">
          <img
            src="/imageLanding1.svg"
            alt="landing image"
            className="object-cover object-center "
          />
          <div className="absolute -top-10 -left-16">
            <CommentCard
              text='"The recipes here are not only delicious but also easy to follow Just like him 😉”.'
              image=""
              name="my girl."
            />
          </div>
          <div className="absolute -bottom-10 -right-10">
            <CommentCard
              text='"The recipes here are not only delicious but also easy to follow Just like him 😉”.'
              image=""
              name="my girl."
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default LandingSection;