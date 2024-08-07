const express = require("express");
const con = require("./db/connection");
const app = express();

const tutorRoutes = require("./routes/tutorRouter");
const petRoutes = require("./routes/petRouter");

app.use(express.json());

app.use(tutorRoutes);
app.use(petRoutes);

con
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
