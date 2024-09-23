import { FC, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Assuming you use lucide-react for icons

interface Review {
  name: string;
  title: string;
  imageUrl: string;
  content: string;
}

interface ReviewCardProps {}

const ReviewCard: FC<ReviewCardProps> = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const reviews: Review[] = [
    {
      name: "Some Random Girl",
      title: "Feminist, CEO",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1673758905770-a62f4309c43c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, possimus modi? Aspernatur placeat modi aperiam nihil iusto veritatis dignissimos accusantium eligendi quo culpa dolor inventore id, numquam, veniam similique perspiciatis. Iure corrupti sapiente distinctio eaque cupiditate, temporibus possimus neque facilis quos laudantium, quisquam atque repudiandae eligendi esse ipsum doloremque sunt facere impedit totam, doloribus modi nulla! Magni tempora nihil obcaecati?",
    },
    {
      name: "Some  Girl",
      title: "Feminist, CEO",
      imageUrl:
        "https://plus.unsplash.com/premium_photo-1673758905770-a62f4309c43c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, possimus modi? Aspernatur placeat modi aperiam nihil iusto veritatis dignissimos accusantium eligendi quo culpa dolor inventore id, numquam, veniam similique perspiciatis. Iure corrupti sapiente distinctio eaque cupiditate, temporibus possimus neque facilis quos laudantium, quisquam atque repudiandae eligendi esse ipsum doloremque sunt facere impedit totam, doloribus modi nulla! Magni tempora nihil obcaecati?",
    },
    // Add more review objects as needed
  ];

  const handlePrevClick = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = (): void => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  const { name, title, imageUrl, content } = reviews[currentIndex];

  return (
    <div className="md:w-[70%] w-[95%] md:px-24 px-4 md:py-14 py-8 flex flex-col mt-14 m-4 h-auto bg-slate-300 rounded-3xl shadow-lg relative">
      <div className="flex w-full gap-8 items-center justify-center">
        <div className="w-1/2 flex justify-end">
          <img
            src={imageUrl}
            alt={name}
            className="size-20 rounded-full object-cover object-top"
          />
        </div>
        <div className="text-left w-1/2">
          <h1 className="font-bold md:text-xl text-sm">{name}</h1>
          <p className="md:text-base text-xs">{title}</p>
        </div>
      </div>
      <div className="mt-4 px-10">
        <span className="text-center md:text-lg text-base md:line-clamp-none line-clamp-[10]">"{content}"</span>
      </div>
      <button
        onClick={handlePrevClick}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-2xl p-2 bg-white rounded-full shadow-lg"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={handleNextClick}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-2xl p-2 bg-white rounded-full shadow-lg"
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default ReviewCard;
