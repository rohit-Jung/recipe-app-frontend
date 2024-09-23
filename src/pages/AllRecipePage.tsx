import { FC, useEffect, useState } from "react";
import { useGetAllRecipes } from "@/services/api/recipes";
import { IRecipe } from "@/types";
import { Container, FoodCard, Heading } from "@/components";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AllRecipePageProps {}

const AllRecipePage: FC<AllRecipePageProps> = () => {
  const [recipes, setRecipes] = useState<IRecipe[] | null>(null);
  const [filteredRecipes, setFilteredRecipes] = useState<IRecipe[] | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const { data, isLoading, isError } = useGetAllRecipes();

  useEffect(() => {
    if (data) {
      setRecipes(data);
      setFilteredRecipes(data);
    }
  }, [data]);

  useEffect(() => {
    if (recipes) {
      let filtered = recipes;

      if (searchTerm) {
        filtered = filtered.filter((recipe) =>
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (categoryFilter !== "all") {
        filtered = filtered.filter(
          (recipe) => recipe.category === categoryFilter
        );
      }

      setFilteredRecipes(filtered);
    }
  }, [searchTerm, categoryFilter, recipes]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>No recipes found</div>;

  return (
    <Container>
      <Heading title="All Recipes" />
      <div className="flex items-center gap-4 mb-8 mt-4">
        <Input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search recipes..."
          className="border p-2 rounded shadow-inner py-5 px-3"
        />

        <Select
          value={categoryFilter}
          defaultValue="all"
          onValueChange={(value) => handleCategoryChange(value as string)}
        >
          <SelectTrigger className="w-1/3 h-full">
            <SelectValue placeholder="Select Category" />
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
              <SelectItem value="all">All</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Recipe Cards */}
      <div className="flex flex-wrap gap-12 pt-3">
        {filteredRecipes &&
          filteredRecipes.map((recipe) => (
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

        {filteredRecipes?.length === 0 && (
          <div className="font-bold text-2xl text-center w-full h-44 inline-flex items-center justify-center">
            No recipes found. Please clear the filter or upload one.
          </div>
        )}
      </div>
    </Container>
  );
};

export default AllRecipePage;
