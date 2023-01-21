// //controllerで複数の関数をexportしてる(There is no logic here, just JS)
// //consroller is managing most of the input from the browser and then sending back a response
// //routerから受け取ったリクエストに対してModelでの処理を実行し、結果をViewに渡しています。
// //ユーザーの入力に基づきモデルとビューを制御する役割を担っています。「クライアント」「モデル」「ビュー」の橋渡し役となります。

// //require: import的な
// const Recipe = require("../model/recipe.model");

// //exports以降のはただの関数名、慣例的にget...って書く

// exports.getRecipesPage = (req, res, next) => {
//   // res.render('recipes', { recipes })
//   //modelのコールバック関数(fetchAllRecipes)をここで呼んで使う
//   Recipe.fetchAllRecipes((recipeData) => {
//     if (recipeData.message) {
//       res.render("400", {
//         title: "Something went wrong",
//         message: recipeData.message,
//       });
//     }

//     res.render("recipes", { recipes: recipeData });
//   });
// };

// exports.getAddRecipePage = (req, res, next) => {
//   res.render("create");
// };

// exports.postAddRecipe = (req, res, next) => {
//   let { name, ingredient, quantity, instruction } = req.body;

//   //Array.isArray(): 渡された値が Array かどうかを判断
//   if (!Array.isArray(ingredient)) {
//     ingredient = [ingredient];
//     quantity = [quantity];
//   }

//   if (!Array.isArray(instruction)) {
//     instruction = [instruction];
//   }

//   const ingredients = ingredient.map((ing, i) => {
//     //ingredient --> [ 'flour', 'sugar', 'butter' ]
//     //quantity -->   [ '1 cup', '4 cups', '2 cups' ]
//     return { name: ing, quantity: quantity[i] };
//   });

//   const newRecipe = new Recipe(name, ingredients, instruction);
//   newRecipe.save(({ message, status }) => {
//     if (status === 200) {
//       return res.redirect("/recipes");
//     }

//     res.status(status).json({ message });
//   });
// };

// exports.getEditRecipe = (req, res) => {
//   const fetchRecipe = Recipe.fetchRecipeById(req.params.id);
//   if (fetchRecipe.msg) {
//     res.render("400", {
//       title: "Recipe Not Found",
//       message: fetchRecipe.msg,
//     });
//   } else {
//     res.render("edit", { title: "Edit Recipe", recipe: fetchRecipe });
//   }
// };

// exports.putEditRecipe = (req, res) => {
//   let { name, ingredients, quantity, instructions } = req.body;

//   //check if ingredient is an array
//   if (!Array.isArray(ingredients)) {
//     ingredients = [ingredients];
//   }

//   //check if quantity is an array
//   if (!Array.isArray(quantity)) {
//     quantity = [quantity];
//   }

//   //remap ingredients and quantities to an array of objects
//   const reMappedIngredients = ingredients.map((ingredient, index) => {
//     return {
//       name: ingredient,
//       quantity: quantity[index],
//     };
//   });

//   //check if instructions is an array
//   if (!Array.isArray(instructions)) {
//     instructions = [instructions];
//   }

//   const updatedRecipe = {
//     id: +req.params.id,
//     name,
//     ingredients: reMappedIngredients,
//     instructions,
//   };

//   Recipe.updateRecipeById(updatedRecipe, ({ message, status }) => {
//     if (status === 200) {
//       res.redirect("/recipes");
//     } else {
//       res.status(status).send(message);
//     }
//   });
// };

// exports.deleteRecipe = (req, res) => {
//   Recipe.deleteRecipeById(req.params.id, ({ message, status }) => {
//     if (status === 200) {
//       res.redirect("/recipes");
//     } else {
//       res.render("404", { title: "Recipe Not Found", message });
//     }
//   });
// };

const Recipe = require("../model/Recipe.model");

exports.getRecipesPage = (req, res) => {
  //create our own callback process
  Recipe.fetchAll((fetchRecipes) => {
    res.render("recipes", {
      title: "Recipes List",
      recipes: fetchRecipes,
    });
  });
};

exports.getRecipeById = (req, res) => {
  const fetchRecipe = Recipe.fetchRecipeById(req.params.id);
  if (fetchRecipe.msg) {
    res.render("400", {
      title: "Recipe Not Found",
      message: fetchRecipe.msg,
    });
  } else {
    res.json(fetchRecipe);
  }
};

exports.getAddRecipePage = (req, res) => {
  res.render("create", { title: "Add Recipe" });
};

exports.postAddRecipe = (req, res) => {
  let { name, ingredients, quantity, instructions } = req.body;

  //check if ingredient is an array
  if (!Array.isArray(ingredients)) {
    ingredients = [ingredients];
  }

  //check if quantity is an array
  if (!Array.isArray(quantity)) {
    quantity = [quantity];
  }

  //remap ingredients and quantities to an array of objects
  const reMappedIngredients = ingredients.map((ingredient, index) => {
    return {
      name: ingredient,
      quantity: quantity[index],
    };
  });

  //check if instructions is an array
  if (!Array.isArray(instructions)) {
    instructions = [instructions];
  }

  const newRecipe = new Recipe(name, reMappedIngredients, instructions);
  newRecipe.save(({ message, status }) => {
    if (status === 200) {
      res.redirect("/recipes");
    } else {
      res.status(status).send(message);
    }
  });
};

exports.getEditRecipe = (req, res) => {
  const fetchRecipe = Recipe.fetchRecipeById(req.params.id);
  if (fetchRecipe.msg) {
    res.render("400", {
      title: "Recipe Not Found",
      message: fetchRecipe.msg,
    });
  } else {
    res.render("edit", { title: "Edit Recipe", recipe: fetchRecipe });
  }
};

exports.putEditRecipe = (req, res) => {
  let { name, ingredients, quantity, instructions } = req.body;

  //check if ingredient is an array
  if (!Array.isArray(ingredients)) {
    ingredients = [ingredients];
  }

  //check if quantity is an array
  if (!Array.isArray(quantity)) {
    quantity = [quantity];
  }

  //remap ingredients and quantities to an array of objects
  const reMappedIngredients = ingredients.map((ingredient, index) => {
    return {
      name: ingredient,
      quantity: quantity[index],
    };
  });

  //check if instructions is an array
  if (!Array.isArray(instructions)) {
    instructions = [instructions];
  }

  const updatedRecipe = {
    id: +req.params.id,
    name,
    ingredients: reMappedIngredients,
    instructions,
  };

  Recipe.updateRecipeById(updatedRecipe, ({ message, status }) => {
    if (status === 200) {
      res.redirect("/recipes");
    } else {
      res.status(status).send(message);
    }
  });
};

exports.deleteRecipe = (req, res) => {
  Recipe.deleteRecipeById(req.params.id, ({ message, status }) => {
    if (status === 200) {
      res.redirect("/recipes");
    } else {
      res.render("404", { title: "Recipe Not Found", message });
    }
  });
};
