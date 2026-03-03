const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();
const IndexRoutes = require("./routes/analysisRoutes");
const port = process.env.PORT || 3000;
app.use(express.json());
app.use("/api",IndexRoutes);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});