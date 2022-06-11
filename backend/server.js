const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();
app.use(express.json()); // To accept the json data from frontend
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
dotenv.config();
connectDB();

//Routes
app.get("/", (req, res) => {
  res.send("Api is running");
});
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

//Middlewares
app.use(notFound);
app.use(errorHandler);
// app.get("/api/chat", (req, res) => {
//     res.send("The array of chats")
// })
// app.get("/api/chat/:id", (req, res) => {
//     const singleChat = chats.find((c) => c._id === req.params.id)
//     res.send(singleChat)
// })

//Listening to Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));
