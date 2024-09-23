import { FC, useEffect, useState } from "react";
import FoodCard from "./cards/FoodCard";
import { useGetAllRecipes } from "@/services/api/recipes";
import { IRecipe } from "@/types";

interface FoodCategorySectionProps {}
// const foods = [
//   {
//     _id: "14",
//     image:
//       "https://images.unsplash.com/photo-1690401767645-595de0e0e5f8?q=80&w=1913&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Spaghetti Carbonara",
//     ratings: 4.5,
//     tags: ["Italian", "Pasta", "Comfort Food"],
//     difficulty: "Medium",
//     prepTime: "30 minutes",
//   },
//   {
//     _id: "123",
//     image:
//       "https://images.unsplash.com/photo-1690401767645-595de0e0e5f8?q=80&w=1913&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "California Roll",
//     ratings: 4.7,
//     tags: ["Japanese", "Sushi", "Seafood"],
//     difficulty: "Hard",
//     prepTime: "45 minutes",
//   },
//   {
//     _id: "123",
//     image:
//       "https://images.unsplash.com/photo-1690401767645-595de0e0e5f8?q=80&w=1913&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Beef Tacos",
//     ratings: 4.3,
//     tags: ["Mexican", "Street Food", "Spicy"],
//     difficulty: "Easy",
//     prepTime: "20 minutes",
//   },
//   {
//     _id: "123",
//     image:
//       "https://images.unsplash.com/photo-1690401767645-595de0e0e5f8?q=80&w=1913&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//     name: "Some Tacos",
//     ratings: 4.3,
//     tags: ["Mexican", "Street Food", "Spicy"],
//     difficulty: "Easy",
//     prepTime: "20 minutes",
//   },
// ];

const FoodCategorySection: FC<FoodCategorySectionProps> = () => {
  const [recipes, setRecipes] = useState<IRecipe[] | null>(null);
  const { data, isLoading, isError } = useGetAllRecipes();

  useEffect(() => {
    if (data) {
      setRecipes(data);
    }
  }, [data]);

  if (isLoading)
    return <div className="h-[300px]  font-bold text-xl ">Loading...</div>;
  if (isError)
    return (
      <div className="h-[300px]  font-bold text-xl ">No recipes found</div>
    );

  return (
    <div className="flex md:items-start items-center justify-between w-full md:h-[300px] md:pt-3 flex-wrap">
      {recipes &&
        recipes
          .slice(0, 4)
          .map((recipe) => (
            <FoodCard
              key={recipe.id}
              name={recipe.name}
              difficulty={recipe.difficulty}
              image={recipe.image_url ?? ""}
              prepTime={recipe.prep_time}
              ratings={5}
              tags={recipe.tags}
              link={`/recipes/${recipe.id}`}
            />
          ))}
      {recipes?.length === 0 && (
        <div className="h-[300px] inlcflex items-center justify-center">
          No recipes found
        </div>
      )}
    </div>
  );
};

export default FoodCategorySection;
