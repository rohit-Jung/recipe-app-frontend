const endPoints = {
  //accounts endpoints
  registerUser: "accounts/register/",
  loginUser: "accounts/login/",
  logoutUser: "accounts/logout/",
  allUsers: "accounts/user/",
  userDetail: (pk: string) => `accounts/users/${pk}/`,
  updateUser: (pk: string) => `accounts/users/${pk}/`,
  deleteUser: (pk: string) => `accounts/users/${pk}/`,
  tokenRefresh: "accounts/token/refresh/",
  getCurrentUser: "accounts/current-user",

  // recipes endpoints
  allRecipes: "recipes/",
  recipeDetail: (pk: string) => `recipes/${pk}/`,
  createRecipe: "recipes/create/",
  userRecipe: "recipes/user/",
  updateRecipe: (pk: string) => `recipes/${pk}/update/`,
  deleteRecipe: (pk: string) => `recipes/${pk}/delete/`,

  //reviews endpoints
  allReviewsOfRecipe: (recipe_id: string) => `recipes/reviews/${recipe_id}`,
  reviewDetail: (pk: string) => `recipes/reviews/${pk}/`,
  createReview: (pk: string) => `recipes/reviews/${pk}/create/`,
  updateReview: (pk: string) => `recipes/reviews/${pk}/update/`,
  deleteReview: (pk: string) => `recipes/reviews/${pk}/delete/`,

  //shopping lists endpoints
  allShoppingLists: "shopping-lists/",
  shoppingListDetail: (pk: string) => `shopping-lists/${pk}/`,
  createShoppingList: "shopping-lists/",
  updateShoppingList: (pk: string) => `shopping-lists/${pk}/`,
  deleteShoppingList: (pk: string) => `shopping-lists/${pk}/`,
  //each item routes
  deleteShoppingListItem: (pk: string) =>
    `shopping-lists/ingredient-items/delete/${pk}/`,
  updateShoppingListItem: (pk: string) =>
    `shopping-lists/ingredient-items/update/${pk}/`,

  //meal plans endpoints
  allMealPlans: "mealplans/",
  mealPlanDetail: (pk: string) => `mealplans/${pk}/`,
  createMealPlan: "mealplans/",
  updateMealPlan: (pk: string) => `mealplans/${pk}/`,
  deleteMealPlan: (pk: string) => `mealplans/${pk}/`,

  // Saved recipes endpoints
  usersSavedRecipes: "saved-recipes/",
  savedRecipeDetail: (pk: string) => `saved-recipes/${pk}/`,
  createSavedRecipe: "saved-recipes/create/",
  deleteSavedRecipe: (pk: string) => `saved-recipes/${pk}/`,
};

export default endPoints;
