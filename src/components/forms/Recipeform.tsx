import { FC, useState, useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Button, Heading } from "@/components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RxCross2 } from "react-icons/rx";
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateRecipe,
  useUpdateRecipe,
  useGetRecipe,
} from "@/services/api/recipes";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IInstructions, IIngredient } from "@/types";
import { Icons } from "../icons";
import { buttonVariants } from "../ui/Button";
import { cn } from "@/lib/utils";

interface RecipeFormValues {
  name: string;
  description: string;
  servings: string;
  prep_time: string;
  cooking_time: string;
  recipe_ingredients: IIngredient[];
  instructions: IInstructions[];
  registerTags: string;
  image?: FileList | undefined;
  difficulty: "easy" | "medium" | "difficult" | "extreme";
  category:
    | "appetizer"
    | "main_course"
    | "dessert"
    | "salad"
    | "snack"
    | "soup"
    | "drink"
    | "breakfast"
    | "side_dish";
}

interface AddRecipePageProps {
  isUpdate?: boolean;
}

const RecipeForm: FC<AddRecipePageProps> = ({ isUpdate = false }) => {
  const { id } = useParams<{ id?: string }>();
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<RecipeFormValues>({
    defaultValues: {
      recipe_ingredients: [{ quantity: "", measurement: "", ingredient: "" }],
      instructions: [{ step_number: "1", description: "" }],
      registerTags: "",
      image: undefined,
    },
    shouldUnregister: false,
  });

  const file: FileList | undefined = watch("image");
  const [fileName, setFileName] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (file && file.length > 0) {
      setFileName(file[0].name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file[0]);
    } else {
      setFileName(null);
      setImagePreview("");
    }
  }, [file]);

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "recipe_ingredients",
  });

  const {
    fields: instructionsFields,
    append: appendInstructions,
    remove: removeInstructions,
  } = useFieldArray({
    control,
    name: "instructions",
  });

  const navigate = useNavigate();
  const { mutate: createRecipe, isPending } = useCreateRecipe();
  const { mutate: updateRecipe, isPending: isUpdatePending } =
    useUpdateRecipe();
  const { data: existingRecipe } = useGetRecipe(id ?? "");

  useEffect(() => {
    if (isUpdate && existingRecipe) {
      const formValues: RecipeFormValues = {
        name: existingRecipe.name || "",
        description: existingRecipe.description || "",
        servings: existingRecipe.servings || "",
        prep_time: existingRecipe.prep_time || "",
        cooking_time: existingRecipe.cooking_time || "",
        recipe_ingredients: existingRecipe.recipe_ingredients || [
          { quantity: "", measurement: "", ingredient: "" },
        ],
        instructions: existingRecipe.instructions || [
          { step_number: "1", description: "" },
        ],
        registerTags: existingRecipe.tags.toString() || "",
        category: existingRecipe.category || "appetizer",
        // image: existingRecipe.image_url || "",
        difficulty: existingRecipe.difficulty || "easy",
      };

      if (existingRecipe.image_url) {
        const image = existingRecipe.image_url;
        setImagePreview(image);
      }

      reset(formValues);
    }
  }, [existingRecipe, isUpdate, reset]);
  console.log("hei", imagePreview);

  const onSubmit: SubmitHandler<RecipeFormValues> = async (data) => {
    const formData = new FormData();

    if (!isUpdate) {
      if (!data.image || data.image.length === 0) {
        toast.error("Please select an image.");
        return;
      }
    }
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    }
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("servings", data.servings);
    formData.append("prep_time", data.prep_time);
    formData.append("cooking_time", data.cooking_time);
    formData.append("category", data.category);

    const tagsArray = data.registerTags
      .split(",")
      .map((tag: string) => tag.trim())
      .filter((tag: string) => tag.length > 0);
    formData.append("tags", JSON.stringify(tagsArray));
    formData.append("difficulty", data.difficulty);
    formData.append(
      "recipe_ingredients",
      JSON.stringify(data.recipe_ingredients)
    );
    formData.append("instructions", JSON.stringify(data.instructions));

    if (isUpdate && id) {
      updateRecipe(
        { id, formData },
        {
          onSuccess: () => {
            toast.success("Recipe updated successfully");
            navigate("/", { replace: true });
          },
        }
      );
    } else {
      // Create new recipe
      createRecipe(formData, {
        onSuccess: () => {
          toast.success("Recipe created successfully");
          navigate("/", { replace: true });
        },
      });
    }
  };

  useEffect(() => {
    instructionsFields.forEach((_field, index) => {
      setValue(`instructions.${index}.step_number`, (index + 1).toString());
    });
  }, [instructionsFields, setValue]);

  return (
    <>
      <div className="w-full min-h-screen shadow-md px-20 py-10 bg-slate-100 mt-10 bg-opacity-90 rounded-3xl">
        <Heading
          title={isUpdate ? "Update the Recipe" : "Add a Recipe"}
          center
        />
        <p className="text-xl pb-3 mt-8">
          {isUpdate
            ? "Update the Recipe"
            : "Feeling like a kitchen Picasso? We want to see your masterpiece! Add your recipe and show off your culinary creativity"}
        </p>
        <hr />
        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="space-y-8"
        >
          <div className="image w-full space-y-3 mt-6">
            <Label className="ml-1 text-xl">Image</Label>
            <div className="ml-1 w-full h-56 bg-[#E0DFD7] rounded-md flex items-center justify-center text-base relative">
              <label
                htmlFor="file-upload"
                className="w-full h-full flex items-center justify-center cursor-pointer  z-20"
              >
                <input
                  id="file-upload"
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  {...register("image", { required: isUpdate ? false : true })}
                  className="hidden"
                />
                <div className="bg-[#F79F1A] flex items-center gap-4 px-7 py-3 rounded-3xl">
                  {!fileName ? <FaPlusCircle size={24} /> : <FaCheckCircle />}
                  <h1 className="text-center font-semibold text-white">
                    {fileName ? fileName : "Add a Photo"}
                  </h1>
                </div>
              </label>
              {imagePreview && (
                <div className="absolute top-0 left-0 w-full h-full  z-10 overflow-hidden">
                  <img
                    src={imagePreview}
                    alt="Image Preview"
                    className="object-cover object-center rounded-md"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3 flex flex-col items-start justify-center">
            <Label className="ml-1  text-xl">Recipe Name</Label>
            <div className="flex items-start w-full gap-4 h-10">
              <Input
                className="h-full"
                placeholder="Enter Recipe Name"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-500">Recipe Name is required</span>
              )}
              <Select
                onValueChange={(value) =>
                  setValue(
                    "difficulty",
                    value as "easy" | "medium" | "difficult" | "extreme"
                  )
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue
                    {...register("difficulty")}
                    placeholder="Difficulty Level"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Levels</SelectLabel>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="difficult">Difficult</SelectItem>
                    <SelectItem value="extreme">Extreme</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.difficulty && (
                <span className="text-red-500">Difficulty is required</span>
              )}

              <Select
                onValueChange={(value) =>
                  setValue(
                    "category",
                    value as
                      | "appetizer"
                      | "main_course"
                      | "dessert"
                      | "salad"
                      | "snack"
                      | "soup"
                      | "drink"
                      | "breakfast"
                      | "side_dish"
                  )
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue
                    {...register("category")}
                    placeholder="Select Category"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="appetizer">Appetizer</SelectItem>
                    <SelectItem value="main_course">Main Course</SelectItem>
                    <SelectItem value="dessert">Dessert</SelectItem>
                    <SelectItem value="salad">Salad</SelectItem>
                    <SelectItem value="snack">Snack</SelectItem>
                    <SelectItem value="soup">Soup</SelectItem>
                    <SelectItem value="drink">Drink</SelectItem>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="side_dish">Side Dish</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.category && (
                <span className="text-red-500">Category is required</span>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <Label className="ml-1 text-xl">Description</Label>
            <Textarea
              placeholder="Enter Description"
              {...register("description", { required: true })}
            />
            {errors.description && (
              <span className="text-red-500">Description is required</span>
            )}
          </div>
          <hr />

          <div className=" w-1/2 flex items-center gap-4 justify-center">
            <Label className="ml-1 text-xl w-1/2">Servings</Label>
            <Input
              placeholder="Enter Servings"
              {...register("servings", { required: true })}
            />
            {errors.servings && (
              <span className="text-red-500">Servings are required</span>
            )}
          </div>

          <div className=" w-1/2 flex items-center gap-4 justify-center">
            <Label className="ml-1 text-lg w-1/2">Preparation Time</Label>
            <Input
              placeholder="Enter Preparation Time"
              {...register("prep_time", { required: true })}
            />
            {errors.prep_time && (
              <span className="text-red-500">Preparation Time is required</span>
            )}
          </div>

          <div className=" w-1/2 flex items-center gap-4 justify-center">
            <Label className="ml-1 text-lg w-1/2">Cooking Time</Label>

            <Input
              placeholder="Enter Cooking Time"
              {...register("cooking_time", { required: true })}
            />
            {errors.cooking_time && (
              <span className="text-red-500">Cooking Time is required</span>
            )}
          </div>
          <hr />

          <div className="space-y-3">
            <Label className="ml-1 text-xl">Ingredients</Label>
            <p>
              List one ingredient per line, specifying quantities (1, 2),
              measurements (cups, spoons), and any prep details (chopped,
              sifted) along with the item. Let your creativity flow in every
              detail!
            </p>
            {ingredientFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-4">
                <Input
                  placeholder="Quantity"
                  {...register(`recipe_ingredients.${index}.quantity`, {
                    required: true,
                  })}
                />
                {errors.recipe_ingredients?.[index]?.quantity && (
                  <span className="text-red-500">Quantity is required</span>
                )}

                <Input
                  placeholder="Measurement"
                  {...register(`recipe_ingredients.${index}.measurement`, {
                    required: true,
                  })}
                />
                {errors.recipe_ingredients?.[index]?.measurement && (
                  <span className="text-red-500">Measurement is required</span>
                )}

                <Input
                  placeholder="Ingredient"
                  {...register(`recipe_ingredients.${index}.ingredient`, {
                    required: true,
                  })}
                />
                {errors.recipe_ingredients?.[index]?.ingredient && (
                  <span className="text-red-500">Ingredient is required</span>
                )}

                <button
                  type="button"
                  onClick={() => (index > 0 ? removeIngredient(index) : null)}
                  className="text-red-500 border-red-500 border p-1 rounded-full"
                >
                  <RxCross2 />
                </button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              className="w-full font-semibold"
              onClick={() =>
                appendIngredient({
                  quantity: "",
                  measurement: "",
                  ingredient: "",
                })
              }
            >
              Add Ingredient +
            </Button>
          </div>
          <hr />

          <div className="space-y-4">
            <Label className=" text-xl">Instructions</Label>
            <p>Break down your recipe into clear, step-by-step instructions.</p>
            {instructionsFields.map((field, index) => (
              <div key={field.id} className="flex flex-col gap-2">
                <div className="text-left text-lg">Step {index + 1}</div>

                <div className="flex w-full items-center gap-4">
                  <Textarea
                    placeholder="Description"
                    {...register(`instructions.${index}.description`, {
                      required: true,
                    })}
                  />
                  {errors.instructions?.[index]?.description && (
                    <span className="text-red-500">
                      Description is required
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      index > 0 ? removeInstructions(index) : null
                    }
                    className="text-red-500 border-red-500 border p-1 rounded-full"
                  >
                    <RxCross2 />
                  </button>
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              className="w-full font-semibold"
              onClick={() =>
                appendInstructions({
                  step_number: "",
                  description: "",
                })
              }
            >
              Add Instruction +
            </Button>
          </div>
          <hr />

          <div className="space-y-3">
            <Label className="ml-1 text-xl">Tags</Label>
            <Input
              placeholder="Enter Tags (comma-separated)"
              {...register("registerTags")}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="submit" variant={"outline"}>
              Cancel
            </Button>
            <button className={cn(buttonVariants())} disabled={isPending}>
              {isPending ||
                (isUpdatePending && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ))}
              {isUpdate ? "Update" : "Publish Recipe"}
            </button>
          </div>
        </form>
        <hr className="mt-6" />
        <p className="italic mt-3">
          If you've come across this recipe in a magazine, cookbook, or on
          another website, we're unable to publish it here. Our platform thrives
          on originality, and published recipes must adhere to our Terms of
          Service. Let's keep the kitchen creativity flowing with your unique
          recipes.
        </p>
      </div>
    </>
  );
};

export default RecipeForm;
