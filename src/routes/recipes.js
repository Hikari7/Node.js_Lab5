const router = require("express").Router();

const {
  getRecipesPage,
  postAddRecipe,
  getRecipeById,
  getAddRecipePage,
  getEditRecipe,
  putEditRecipe,
  deleteRecipe,
} = require("../controller/recipes.controller");

router.get("/", getRecipesPage);
router.get("/create", getAddRecipePage);
router.post("/save", postAddRecipe);
router.get("/:id", getRecipeById);
router.get("/:id/edit", getEditRecipe);
router.put("/:id/edit", putEditRecipe);
router.delete("/delete/:id", deleteRecipe);

module.exports = router;
// const express = require("express");

// //このRoutesをそれぞれの関数としてrecipe.controllerにdestructureしている
// const {
//   getRecipesPage,
//   getAddRecipePage,
//   postAddRecipe,
//   getRecipeById,
//   getEditRecipe,
//   deleteRecipe,
//   putEditRecipe,
// } = require("../controller/recipe.controller");

// const router = express.Router();

// //上から下に読むから、IDは一番下に書きましょう

// /** Get all recipes
//  * @route GET //localhost:8000/recipes/
//  * @desc Get all recipes
//  */
// router.get("/", getRecipesPage);

// //router.get("/", getRecipesPage);
// //の第二引数はそのままcontrollerのコールバック関数として渡されてる

// /**
//  * @route POST //localhost:8000/recipes/save
//  * @desc Save a recipe
//  */
// router.post("/save", postAddRecipe);

// /**Get a single recipe
//  * @route GET //localhost:8000/recipes/create
//  * @desc Get the create recipe form
//  */
// router.get("/create", getAddRecipePage);

// /**
//  * @route GET //localhost:8000/recipes/:id
//  * @desc Get a single recipe by id
//  **/
// router.get("/:id", getRecipeById);

// router.get("/edit/:id", getEditRecipe);
// //↓
// //process the function of editing after you send the post to edit
// router.put("/edit/id", putEditRecipe);

// //delete recipe
// router.delete("/delete/:id", deleteRecipe);

// module.exports = router;
