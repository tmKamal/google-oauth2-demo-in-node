const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const HttpError = require("./models/http-error");
const authRoutes = require("./routes/google-auth-route");
const mailRoutes = require("./routes/google-mail-route");

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());

// cors handler
app.use(cors({ origin: `${process.env.CLIENT_URL}`, credentials: true }));

// routes middleware
app.use("/api/auth", authRoutes);
app.use("/api/mail", mailRoutes);

// Error Handler
app.use(() => {
	const error = new HttpError("page not found!", 404);
	throw error;
});

app.use((error, req, res, next) => {
	if (res.headerSent) {
		// when headers already sent, we can't output an error. Therefore just return next
		return next(error);
	}
	res.status(error.code || 500);
	res.json({ error: error.message || "An unknown error occurred !!" });
	return next();
});

// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`server is running on port : ${port}`);
});
