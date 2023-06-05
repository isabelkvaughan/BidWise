const path = require("path");
const express = require("express");
const session = require("express-session");
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
//const { Sequelize } = require("sequelize");
const routes = require("./controllers/routes");
const helpers = require("./utils/helpers");
const sequelize = require("./config/connection");
const app = express();
const PORT = process.env.PORT || 3000; //default to port 3000 if not live (testing)
const hbs = exphbs.create({});
Handlebars.registerHelper("json", function (context) {
  return JSON.stringify(context);
});
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Load environment variables from .env file
require("dotenv").config();

// Set the environment variable
process.env.NODE_ENV = process.env.NODE_ENV || "production";

// Test the database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");

    // Synchronize Sequelize models with the database
    await sequelize.sync();
    console.log("Sequelize models synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", routes);

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });
});

// // Increase server timeout
// server.setTimeout(30000); // Set the timeout value in milliseconds (e.g., 30 seconds)
