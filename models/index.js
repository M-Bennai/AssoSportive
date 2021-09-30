const dbConfig = require("../config/config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.gymnases = require("./gymnases.js")(mongoose);
db.sportifs = require("./sportifs")(mongoose);

module.exports = db;
