const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModifiy:true
    });
    console.log("MongoDB Connected :" + conn.connection.host);
  } catch (error) {
    console.log("The error while connecting with database" + error);
    process.exit();
  }
};

module.exports = connectDB;
