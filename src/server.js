"use strict";
const app = require("./app");
const { PORT } = process.env;

app.listen(PORT, () => {
  console.log(`listion on httpp://localhost:${PORT}`);
});
