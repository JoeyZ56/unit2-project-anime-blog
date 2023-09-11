require("dotenv").config();

require("./config/database");

const app = require("./app-server");

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`I am listening on ${PORT}. All systems are a go!`);
});
