const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();
app.use(express.json()); // To accept the json data from frontend
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
dotenv.config();
connectDB();

//Requiring:-

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);
// app.get("/api/chat", (req, res) => {
//     res.send("The array of chats")
// })

// app.get("/api/chat/:id", (req, res) => {
//     const singleChat = chats.find((c) => c._id === req.params.id)
//     res.send(singleChat)
// })

const PORT = process.env.PORT || 5000;
app.listen(5000, console.log(`Server started on port ${PORT}`));
