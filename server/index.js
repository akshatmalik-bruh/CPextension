const express = require("express");
const cors = require("cors");
const app = express();
const {rateLimit} = require("express-rate-limit");

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, 
	limit: 10, 
	message : {error : "Too many requests on the server please try again later"}
})
app.use(cors());
app.use("/api",limiter);

const dotenv = require("dotenv");
dotenv.config();
const IndexRoutes = require("./routes/analysisRoutes");
const port = process.env.PORT || 3000;
app.use(express.json());
app.use("/api",IndexRoutes);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});