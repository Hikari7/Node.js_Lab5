//controllerで複数の関数をexportしてる(There is no logic here, just JS)
//consroller is managing most of the input from the browser and then sending back a response

//require: import的な
const Recipe = require("../model/recipe.model");

//exports以降のはただの関数名、慣例的にget...って書く

exports.getRecipesPage = (req, res, next) => {
  // res.render('recipes', { recipes })
  //modelのコールバック関数(fetchAllRecipes)をここで呼んで使う
  Recipe.fetchAllRecipes((recipeData) => {
    if (recipeData.message) {
      res.render("400", {
        title: "Something went wrong",
        message: recipeData.message,
      });
    }

    res.render("recipes", { recipes: recipeData });
  });
};

exports.getAddRecipePage = (req, res, next) => {
  res.render("create");
};

exports.postAddRecipe = (req, res, next) => {
  let { name, ingredient, quantity, instruction } = req.body;

  //Array.isArray(): 渡された値が Array かどうかを判断
  if (!Array.isArray(ingredient)) {
    ingredient = [ingredient];
    quantity = [quantity];
  }

  if (!Array.isArray(instruction)) {
    instruction = [instruction];
  }

  const ingredients = ingredient.map((ing, i) => {
    //ingredient --> [ 'flour', 'sugar', 'butter' ]
    //quantity -->   [ '1 cup', '4 cups', '2 cups' ]
    return { name: ing, quantity: quantity[i] };
  });

  const newRecipe = new Recipe(name, ingredients, instruction);
  newRecipe.save(({ message, status }) => {
    if (status === 200) {
      return res.redirect("/recipes");
    }

    res.status(status).json({ message });
  });
};

exports.getRecipeById = (req, res, next) => {
                        //acceccing the recipe class
  const fetchRecipe = Recipe.findById(req.params.id);

  //if there is a message
  if (fetchRecipe.message) {
    res.render("400", {
      title: "Something went wrong",
      message: fetchRecipe.message,
    });
  }

  res.json(fetchRecipe);
};
