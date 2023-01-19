const fs = require("fs");
const path = require("path");

const recipes = require("../data/recipes.json");

const rootDir = require("../utils/path-helper");
const dataPath = path.join(rootDir, "data", "recipes.json");

//modelsでDBを読み取りをしてる(module.export: export defaultのイメージ)
//comminication with data should be done in the model (not in controller)

//classを作る(新しいレシピを作るから)
module.exports = class Recipe {
  constructor(name, ingredient, instruction) {
    this.id = recipes.length + 1;
    this.name = name;
    this.ingredient = ingredient;
    this.instruction = instruction;
  }

  //method1:
  save(callback) {
    fs.readFile(dataPath, "utf8", (err, data) => {
      if (err) {
        //resオブジェクトはcontrolerの中に書くよ

        //controller
        callback({ message: "Could not read recipe.json", status: 500 });
      }

      //Parse the JSON file
      const recipes = JSON.parse(data);

      //this is based on the new object datas(newのobjectまるっとpush)
      recipes.push(this);

      //Write the new data to JSON file
      fs.writeFile(
        dataPath,
        //JSON文字列に変換する
        JSON.stringify(recipes, null, 2),
        "utf8",
        (err) => {
          if (err) {
            callback({
              message: "Could not write to recipe.json",
              status: 500,
            });
          }
          //array of the data
          callback({ message: "Recipe saved successfully", status: 200 });
        }
      );
    });
  }

  //static
  static fetchAllRecipes(callback) {
    fs.readFile(dataPath, (err, data) => {
      if (err) {
        callback({ message: "Could not read recipe.json", status: 500 });
      }
      //JSON.parse(): JSON形式で書かれた文字列をJavaScriptのJSONオブジェクトに変換する
      callback(JSON.parse(data));
    });
  }

  //static
  static findById(id) {
    const recipes = JSON.parse(fs.readFileSync(dataPath));
    //idが文字列の可能性もあるのでparseIntでnumに変換しとく
    const found = recipes.some((recipe) => recipe.id === parseInt(id));

    if (!found) {
      return { message: "Recipe not found", status: 404 };
    }

    return recipes.find((recipe) => recipe.id === parseInt(id));
  }
};
