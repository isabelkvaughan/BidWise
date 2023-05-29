const express = require("express");
const routes = require("./routes");
//const apiRoutes = require("./api");

const app = express();
const PORT = process.env.PORT || process.env.DB_PORT;

app.use(express.json());
app.use("/", routes);
app.use("/api", routes);
//app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
