import {
  Breadcrumbs,
  Button,
  DeleteConfirm,
  Heading,
  ReviewSection,
} from "@/components";
import { FC, useEffect, useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { BsCalendar2DateFill } from "react-icons/bs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { IIngredient, IRecipe } from "@/types";
import { PlusCircle } from "lucide-react";
import { useCreateShoppingList } from "@/services/api/shopping_lists";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDeleteRecipe, useGetRecipe } from "@/services/api/recipes";
import toast from "react-hot-toast";
import { FaBookmark, FaRegBookmark, FaShareSquare } from "react-icons/fa";
import {
  useCreateSavedRecipe,
  useDeleteSavedRecipe,
  useSavedRecipeDetail,
} from "@/services/api/saved_recipe";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  MdDeleteOutline,
  MdEdit,
  MdOutlineAddShoppingCart,
} from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ShareCard from "@/components/cards/ShareCard";

const breadCrumbItems = [
  { title: "Home", link: "/" },
  { title: "Recipe", link: "/recipe" },
];

const ViewRecipePage: FC = () => {
  const { recipeId } = useParams<{ recipeId?: string }>();
  const navigate = useNavigate();

  const { data, isSuccess, isError, isLoading } = useGetRecipe(recipeId!);
  const { mutate: addItems } = useCreateShoppingList();
  const { data: savedRecipe, isSuccess: isSavedDetailSuccess } =
    useSavedRecipeDetail(recipeId!);
  const { mutate: createSaved } = useCreateSavedRecipe();
  const { mutate: deleteSaved } = useDeleteSavedRecipe();
  const { mutate: deleteRecipe } = useDeleteRecipe();

  const [recipe, setRecipe] = useState<IRecipe | null>(null);
  const [savedStatus, setSavedStatus] = useState<boolean>(false);

  useEffect(() => {
    if (isSavedDetailSuccess && savedRecipe) {
      setSavedStatus(true);
    } else {
      setSavedStatus(false);
    }
  }, [isSavedDetailSuccess, savedRecipe]);

  useEffect(() => {
    if (isSuccess && data) {
      setRecipe(data);
    }
  }, [isSuccess, data]);

  const [isAuthor, setIsAuthor] = useState<boolean>(false);
  const user = useSelector((root: RootState) => root.auth.user);

  useEffect(() => {
    if (user?.id === recipe?.user?.id) {
      setIsAuthor(true);
    }
  }, [user, recipe]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>No such recipes found</div>;

  const handleAddToShoppingList = ({
    title,
    ingredients,
  }: {
    title: string;
    ingredients: IIngredient[];
  }) => {
    const formattedIngredients = ingredients.map((ingredient) => ({
      ingredient: ingredient.ingredient,
      quantity: ingredient.quantity,
      measurement: ingredient.measurement,
      checked: false,
    }));

    const payload = {
      title,
      ingredient_items: formattedIngredients,
    };

    addItems(payload, {
      onSuccess: () => {
        toast.success("Added items to the shopping list");
      },
      onError: () => {
        toast.error("Failed to add items to the shopping list");
      },
    });
  };

  const handleDeleteRecipe = () => {
    deleteRecipe(recipeId!, {
      onSuccess: () => {
        toast.success("Recipe deleted successfully");
        navigate("/", { replace: true });
      },
      onError: () => {
        toast.error("Failed to delete recipe");
      },
    });
  };

  const handleSaveRecipe = () => {
    if (!recipe) return;

    if (!savedStatus) {
      createSaved(
        { recipe_id: recipe.id! },
        {
          onSuccess: () => {
            setSavedStatus(true);
            toast.success("Recipe saved successfully");
          },
          onError: () => {
            toast.error("Failed to save recipe");
          },
        }
      );
    } else {
      if (!savedRecipe?.id) return;

      deleteSaved(savedRecipe.id, {
        onSuccess: () => {
          setSavedStatus(false);
          toast.success("Recipe unsaved successfully");
        },
        onError: () => {
          toast.error("Failed to delete recipe");
        },
      });
    }
  };

  return (
    recipe && (
      <>
        <div className="flex flex-col justify-center py-4 gap-3 items-start ml-8 md:ml-0 ">
          <Breadcrumbs items={breadCrumbItems} />
          <Heading title={recipe.name} />
          <div className="flex md:items-center items-start md:flex-row flex-col md:gap-0 gap-3 w-full justify-between">
            <div className="flex gap-20 items-center">
              <div className="flex items-center justify-center gap-4">
                <IoPersonCircle size={23} />
                <HoverCard>
                  <HoverCardTrigger asChild>
                    <p className="hover:underline cursor-pointer">
                      {recipe.user.username}
                    </p>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">
                        {recipe.user.username}
                      </h4>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
              <div className="flex items-center justify-center gap-4">
                <BsCalendar2DateFill />
                <p>{new Date(recipe.created_at).toLocaleDateString()}</p>
              </div>
              <div
                className="flex items-center justify-center gap-4 cursor-pointer"
                onClick={handleSaveRecipe}
              >
                {savedStatus ? (
                  <FaBookmark className="text-orange-500" />
                ) : (
                  <FaRegBookmark />
                )}
                <p>{savedStatus ? "Saved" : "Save"}</p>
              </div>
            </div>

            <div className="flex gap-3">
              {isAuthor && (
                <div className="edit flex items-center justify-center gap-4">
                  <Link to={`/my-recipes/edit/${recipe.id}`}>
                    <Button className="flex items-center justify-center gap-4">
                      <p>Edit </p>
                      <MdEdit />
                    </Button>
                  </Link>
                  <div className="flex items-center justify-center">
                    <DeleteConfirm
                      handleConfirm={handleDeleteRecipe}
                      trigger={
                        <Button className="bg-rose-500 hover:bg-rose-600 ">
                          <p>Delete</p>
                          <MdDeleteOutline />
                        </Button>
                      }
                      label="Are you sure you want to delete this recipe?"
                      description="This recipe will be deleted permanently."
                    />
                  </div>
                </div>
              )}
              <Dialog>
                <DialogTrigger className="flex items-center justify-center gap-3 hover:bg-orange-700 cursor-pointer bg-orange-600 px-3 rounded-md">
                  <FaShareSquare />
                  <h1>Share</h1>
                </DialogTrigger>
                <DialogContent className="w-full">
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-center">
                      Share us with <hr className="mb-0" />
                    </DialogTitle>
                    <DialogDescription className="w-full p-0 m-0">
                      <ShareCard link={window.location.href} recipe={recipe}/>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="w-full py-4 flex items-start md:flex-row flex-col gap-8">
            <img
              className="md:w-[70%] w-full max-h-[30rem] bg-slate-600 object-cover object-center rounded-3xl shadow-sm"
              src={recipe.image_url}
              alt={recipe.name}
            />
            <div className="md:w-[30%] w-full bg-[#F2F2F2] rounded-br-3xl max-h-[30rem] px-8 py-8 space-y-3">
              <h2 className="text-3xl font-bold">About the dish</h2>
              <hr className="bg-black h-[0.15rem]" />
              <div className="h-[85%] w-full bg-[#D7D7D7] rounded-3xl p-4">
                <p>{recipe.description}</p>
              </div>
            </div>
          </div>
          <div className="w-full min-h-20 bg-[#F3F3F3] rounded-3xl p-6 space-y-4 flex items-center justify-evenly">
            <div className="flex flex-col items-center justify-center">
              <img src="/servings.svg" alt="servings" />
              <h3 className="text-xl font-semibold">Servings</h3>
              <p>{recipe.servings}</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img src="/cookTime.svg" alt="cookTime" />
              <h3 className="text-xl font-semibold">Cooking Time</h3>
              <p>{recipe.cooking_time}</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <img src="/prep.svg" alt="prepTime" />
              <h3 className="text-xl font-semibold">Preparation Time</h3>
              <p>{recipe.prep_time}</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3">Ingredients</h3>
            <ul>
              {recipe.recipe_ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className="flex items-center justify-start gap-2"
                >
                  <PlusCircle />
                  <li className="py-2">
                    {ingredient.quantity} {ingredient.measurement}{" "}
                    {ingredient.ingredient}
                  </li>
                </div>
              ))}
              <Button
                variant={"outline"}
                className="rounded-full"
                onClick={() =>
                  handleAddToShoppingList({
                    title: recipe.name,
                    ingredients: recipe.recipe_ingredients,
                  })
                }
              >
                <MdOutlineAddShoppingCart size={20} />
                <p className="ml-3">Add To Shopping List</p>
              </Button>
            </ul>
            <h3 className="text-xl font-semibold mt-3">Instructions</h3>
            <ol>
              {recipe.instructions.map((step, index) => (
                <div key={index}>
                  <li className="py-3">
                    {step.step_number}. {step.description}
                  </li>
                </div>
              ))}
            </ol>
            <h3 className="text-xl font-semibold mt-6 mb-2">Tags</h3>
            {recipe.tags.map((tag, index) => (
              <Button
                variant={"outline"}
                className="rounded-full px-8 mr-4"
                key={index}
                onClick={() => null}
              >
                {tag}
              </Button>
            ))}
          </div>
          <ReviewSection recipeId={recipeId!} />
        </div>
      </>
    )
  );
};

export default ViewRecipePage;
