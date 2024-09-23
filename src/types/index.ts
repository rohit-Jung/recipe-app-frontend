// Represents a user with a unique identifier, username, and email
export interface IUser {
  access?: string;
  bio: string;
  email: string;
  first_name: string;
  id?: string;
  last_name: string;
  profile_picture?: FileList | undefined;
  refresh?: string;
  username: string;
  profile_picture_url?: string;
  role: "chef" | "food_enthusiast" | "meal_planner";
}

// Represents a single ingredient

export interface IIngredient {
  id?: string;
  quantity: string;
  measurement: string;
  ingredient: string;
  checked?: boolean;
}

// Represents a single instruction step

export interface IInstructions {
  step_number: string;
  description: string;
}

// Represents a recipe with details including structured ingredients, instructions, and associated user
export interface IRecipe {
  id?: string;
  name: string;
  description: string;
  recipe_ingredients: IIngredient[];
  instructions: IInstructions[];
  image: string;
  image_url?: string;
  difficulty: "easy" | "medium" | "difficult" | "extreme";
  tags: string[];
  servings: string;
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
  cooking_time: string;
  prep_time: string;
  user: Partial<IUser>;
  created_at: Date;
  updated_at: Date;
}

// Represents a review for a recipe, including user information and rating
export interface IReview {
  id?: string;
  recipe?: IRecipe;
  user?: IUser;
  rating: number;
  comment: string;
  created_at?: string;
}
// Represents a shopping list with a list of items and associated user
export interface IShoppingList {
  id?: string;
  user?: IUser;
  title: string;
  ingredient_items: IIngredient[];
  created_at?: string;
  updated_at?: string;
}

export interface ISavedRecipe {
  id: string;
  user: IUser;
  recipe: IRecipe;
  saved_at: string;
}

// Represents a meal plan which includes a list of recipes and the user who created it
export interface IMealPlan {
  id: string;
  user: IUser;
  name: string;
  recipes: IRecipe[];
  created_at: string;
  updated_at: string;
}

// Represents an error response with a message
export interface IErrorResponse {
  message: string;
}

// Represents the response from a create or update operation
export interface ICreateUpdateResponse {
  [x: string]: any;
  id: string;
  // Add other response fields if necessary
}

// Represents the response from a delete operation
export interface IDeleteResponse {
  success: boolean;
}

// Represents data types for mutation operations, allowing partial updates to various entities
export type MutationDataType =
  | Partial<IUser>
  | Partial<IRecipe>
  | Partial<IReview>
  | Partial<IShoppingList>
  | Partial<IMealPlan>
  | undefined;
