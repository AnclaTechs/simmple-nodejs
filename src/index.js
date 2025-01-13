const express = require("express");

const callLogger = require("./middlewares/logger");
const appRouter = require("./routes/app");

const app = express();

app.use(callLogger.createLog);

app.use("/api/v1/app", appRouter);

app.use((req, res, next) => {
    res.status(404).json({
        message: "Resource not found"
    })
});


const PORT = process.env.PORT || 8080;

app.listen(PORT, console.log("Server started running on port ", PORT));