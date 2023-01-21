const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const methodOverride = require("method-override");

const PORT = process.env.PORT || 9000;
const app = express();

// view engine setup
app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(logger("dev"));
app.use(methodOverride("_method"));
// app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/index"));
app.use("/recipes", require("./routes/recipes"));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));

// //import 3rd party modules
// const express = require("express");
// const bodyParser = require("body-parser");
// const path = require("path");
// const logger = require("morgan");
// const methodOverride = require("method-override");

// //import routes
// const indexRoute = require("./routes/index.route");
// const recipeRoutes = require("./routes/recipe.route");
// const rootDirectory = require("./utils/path-helper");

// //config and instance of express
// const app = express();

// app.set("view engine", "ejs");
// app.set("views", "src/views");

// app.use(logger("dev"));
// //key name
// app.use(methodOverride("_method"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(rootDirectory, "public")));

// //routes(app.useでパス(ミドルウェア)を渡す)
// app.use("/", indexRoute);
// app.use("/recipes", recipeRoutes);

// //catch-all route/middleware
// app.use((req, res, next) => {
//   res.status(404).send("<h1>Page not found</h1>");
// });

// //start server
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

// //MVCのストラクチャーで開発をしてるってことだよ, 作る順番もこんな感じ
// // Client(Browser) ---> Entry File ---> Routes ---> Controllers ---> Models
