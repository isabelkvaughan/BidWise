const express = require("express");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || process.env.DB_PORT;

app.use(express.json());
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = upload;
