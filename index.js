import express from "express";
import mongodb from "mongodb";
import cors from "cors";
import dotenv from "dotenv";
import gymnasesDAO from "./dao/gymnaseDAO.js";
import route from "./api/gymDB.route.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", route);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

dotenv.config();
const MongoClient = mongodb.MongoClient;

route(app);
const port = process.env.PORT || 8000;

MongoClient.connect(process.env.GYM_DB_URI, {
  maxPoolSize: 50,
  writeConcern: { wtimeout: 2500 },
  useNewUrlParser: true,
})
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })
  .then(async (client) => {
    await gymnasesDAO.injectDB(client);
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
