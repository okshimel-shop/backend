const cors = require("cors");
const express = require("express");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const { sequelize } = require('./db/config')

//Routers
const { typesRouter } = require("./services/routers/types.router");
const { categoriesRouter } = require("./services/routers/categories.router");
const { productsRouter } = require("./services/routers/products.router");
const { usersRouter } = require("./services/routers/users.router");

exports.Server = class Server {
  constructor() {
    this.app = null;
  }

  async start() {
    this.initServer();
    this.initMiddlewares();
    await this.initDbConnection();
    this.initRoutes();
    this.initErrorHandling();
    this.startListening();
  }

  initServer() {
    this.app = express();
  }

  initMiddlewares() {
    this.app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  async initDbConnection() {
    try {
      await sequelize.authenticate();
      console.log('Database connection successful');
      await sequelize.sync();
      console.log("All models were synchronized successfully");
    } catch (error) {
      console.error('Database connection failed');
      process.exit(1);
    }
  }

  initRoutes() {
    this.app.use("/types", typesRouter);
    this.app.use("/categories", categoriesRouter);
    this.app.use("/products", productsRouter);
    this.app.use("/users", usersRouter);
  }

  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      const status = err.status || 500;
      return res.status(status).send(err.message);
    });
  }

  startListening() {
    this.app.listen(process.env.PORT, () => {
      console.log("Started listening on port", process.env.PORT);
    });
  }
};
