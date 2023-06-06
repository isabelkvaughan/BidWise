const express = require("express");
const routes = require("./routes");
const multer = require("multer");
const app = express();
const upload = multer({ dest: "public/images/" });
const PORT = process.env.PORT || process.env.DB_PORT;

app.use(express.json());
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
