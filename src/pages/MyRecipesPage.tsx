import { Container, FoodCard } from "@/components";
import { useGetUserCreatedRecipes } from "@/services/api/recipes";
import { useGetUserSavedRecipes } from "@/services/api/saved_recipe";
import { IRecipe, ISavedRecipe } from "@/types";
import { FC, useEffect, useState } from "react";

interface MyRecipesPageProps {
  text?: string;
}
// const foods = [
//   {
//     _id: "13",
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
const MyRecipesPage: FC<MyRecipesPageProps> = () => {
  const [myRecipes, setMyRecipes] = useState<IRecipe[] | null>(null);
  const [mySavedRecipes, setMySavedRecipes] = useState<ISavedRecipe[] | null>(
    null
  );

  const { data: userRecipes, isSuccess: userRecipesSuccess } =
    useGetUserCreatedRecipes();
  const { data: userSavedRecipes, isSuccess: userSavedRecipesSuccess } =
    useGetUserSavedRecipes();

  useEffect(() => {
    if (userRecipesSuccess && userRecipes) {
      setMyRecipes(userRecipes);
    }

    if (userSavedRecipesSuccess && userSavedRecipes) {
      setMySavedRecipes(userSavedRecipes);
    }
  }, [
    userRecipesSuccess,
    userSavedRecipesSuccess,
    userRecipes,
    userSavedRecipes,
  ]);

  console.log(myRecipes);
  console.log(mySavedRecipes);
  return (
    <>
      <Container>
        <h1 className="text-3xl font-bold my-3 ml-3">My Recipes</h1>
        <div className="flex items-start justify-start gap-12 w-full pt-3 flex-wrap">
          {myRecipes &&
            myRecipes?.length > 0 &&
            myRecipes.map(
              ({ name, image, difficulty, prep_time, tags, id }) => (
                <FoodCard
                  key={name}
                  name={name}
                  difficulty={difficulty}
                  image={image}
                  prepTime={prep_time}
                  ratings={5}
                  tags={tags}
                  link={`/my-recipes/edit/${id}`}
                />
              )
            )}
        </div>
        <h1 className="text-3xl font-bold my-3 ml-3">Saved Recipes</h1>
        <div className="flex items-start justify-start w-full gap-12  pt-3 flex-wrap">
          {mySavedRecipes &&
            mySavedRecipes?.length > 0 &&
            mySavedRecipes.map((saved) => (
              <FoodCard
                key={saved.recipe.id}
                name={saved.recipe.name}
                difficulty={saved.recipe.difficulty}
                image={saved.recipe.image_url as string}
                prepTime={saved.recipe.prep_time}
                ratings={5}
                tags={saved.recipe.tags}
                link={`/recipe/${saved.recipe.id}`}
              />
            ))}
        </div>
      </Container>
    </>
  );
};

export default MyRecipesPage;
