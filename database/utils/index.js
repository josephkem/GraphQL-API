const mongoose = require("mongoose");
const colors = require("colors");

module.exports.connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database Connection Successful".cyan.underline.bold);
  } catch (err) {
    console.log(err);
  }
};
