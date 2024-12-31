require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const contestRoutes = require("./routes/contestRoutes");
const userRoutes = require("./routes/userRoutes");
const blogRouts = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const portfolioRoutes = require("./routes/portfolioRoutes");
const bodyParser = require("body-parser");
const dbConnect = require("./config/database");
const { uploadOnCloudinary } = require("./controllers/cloudnary");
const FileUpload = require("./config/multer-config");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// passportConfig(app);
// app.use(express.urlencoded());
app.use(
  cors({
    credentials: true,
  })
);

dbConnect().then(() => console.log("Connected to MongoDB"));

app.use("/api/contests", contestRoutes);
app.use("/api/users", userRoutes);
app.use("/api/blog", blogRouts);
// app.use('/api/cloudnary', cloudnaryRouter)
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/auth", authRoutes);

const PORT = 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
