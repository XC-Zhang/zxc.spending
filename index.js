const express = require("express");
const path = require("path");
const app = express()
    .use("/node_modules", express.static("./node_modules"))
    .get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "./public/index.html"));
    });

if (process.env.NODE_ENV === "development") {
    const webpack = require("webpack");
    const webpackDevMiddleware = require("webpack-dev-middleware");
    const webpackConfig = require("./webpack.dev.js");
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {
        
    }));
}

app.use(express.static("./public"))
app.get("*", function (req, res, next) {
    if (!req.headers) {
        return next();
    }
    if (!req.headers.accept) {
        return next();
    }
    if (req.headers.accept.indexOf("application/json") === 0) {
        return next();
    }
    if (req.headers.accept.indexOf("text/html") === -1) {
        return next();
    }
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

const config = require("./config.json");
const server = app.listen(config.port);