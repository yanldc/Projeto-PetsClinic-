const express = require("express");
const con = require("./db/connection");
const app = express();

const swaggerUI = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')

const tutorRoutes = require("./routes/tutorRouter");
const petRoutes = require("./routes/petRouter");

app.use(express.json());

app.use(tutorRoutes);
app.use(petRoutes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

con
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
