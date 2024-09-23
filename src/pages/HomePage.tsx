import {
  AboutUsCard,
  Button,
  FoodCategorySection,
  Heading,
  LandingSection,
  NewsLetterCard,
  ReviewCard,
} from "@/components";
import { FC } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate, useOutletContext } from "react-router-dom";

interface HomePageProps {}

export type OutletContextType = {
  aboutRef: React.RefObject<HTMLDivElement>;
};

const HomePage: FC<HomePageProps> = () => {
  const { aboutRef } = useOutletContext<OutletContextType>();
  const navigate = useNavigate()
  return (
    <>
      <div className="">
        <div className="w-full mt-4 text-center">
          <div className="flex flex-wrap h-full items-center">
            <LandingSection />
            <section className="space-y-5 pt-2 md:pl-2 px-12 w-full min-h-screen mt-10">
              <div className="text-left space-y-2">
                <Heading title="Discover Popular ones" />
                <h3 className="text-xl">
                  Check our most popular recipes of this week
                </h3>
              </div>
              <div className="flex items-center justify-between h-12 w-full">
                <div className="h-full flex items-center justify-center bg-slate-700 w-96 rounded-br-3xl text-white  ">
                  <h1 className="text-xl text-left">Popular Meals</h1>
                </div>
                <div className="h-full md:flex hidden">
                  <Button className="h-full w-40" onClick={() => navigate('/recipes')}>See all</Button>
                </div>
              </div>
              <FoodCategorySection />
              <FoodCategorySection />
              <div className="w-full flex justify-center items-center pt-4">
                <button className="flex text-center items-center justify-center gap-3 py-3 px-10 rounded-full bg-[#F79F1A]">
                  <h1 className="text-lg text-white">See More recipes </h1>
                  <div className="size-10 rounded-full p-2 bg-white flex items-center justify-center">
                    <MdOutlineKeyboardArrowRight
                      className="text-[#F79F1A]"
                      size={35}
                    />
                  </div>
                </button>
              </div>
            </section>
            <section className="newsLetter w-full">
              <NewsLetterCard />
            </section>
            <section className="reviews py-20 w-full flex flex-col items-center">
              <h1 className="font-thin text-[#F79F1A] text-2xl">Reviews</h1>
              <Heading title="What people say about us" center />
              <ReviewCard />
            </section>
            <section id="about" ref={aboutRef} className="aboutUs w-full">
              <AboutUsCard />
            </section>
            <div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
