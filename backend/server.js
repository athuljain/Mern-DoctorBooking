const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { handleChat } = require("./controllers/ChatController")

dotenv.config();

const adminRoute = require("./routes/admin");
const userRoute = require("./routes/user");


const app = express();
const port = process.env.PORT 

const corsOptions = {
  origin: true,
};


const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/doctor_booking", {
      useNewUrlParser: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log("MongoDB connection failed:", error);
    process.exit(1); // Exit process with failure
  }
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api", adminRoute);
app.use("/api/v1/users", userRoute);

app.post("/api/chat", handleChat);


app.get("/api/history", async (req, res) => {
  const history = await require("./models/Chat").find().sort({ timestamp: 1 });
  res.json(history);
});


connect().then(() => {
  app.listen(port, () => {
    console.log("Server listening on port", port);
  });
});
