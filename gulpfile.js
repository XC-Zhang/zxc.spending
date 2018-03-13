const gulp = require("gulp");

gulp.task("generate-service-worker", function () {
    const swPrecache = require("sw-precache");
    const log = require("fancy-log");
    const rootDir = "./public";

    return swPrecache.write(`${rootDir}/service-worker.js`, {
        cacheId: "spendingPWA",
        logger: log,
        staticFileGlobs: [
            `${rootDir}/index.html`,
            `${rootDir}/styles/bundle.css`,
            `${rootDir}/scripts/bundle.js`,
            `${rootDir}/fonts/Material-Icons.woff2`
        ],
        stripPrefix: rootDir
    });
});

gulp.task("webpack", function (callback) {
    const webpack = require("webpack");
    const log = require("fancy-log");
    webpack(require("./webpack.prod.js"), function (err, stats) {
        if (err) {
            callback(err);
            return;
        }
        const info = stats.toJson();
        if (stats.hasErrors()) {
            callback(info.errors);
            return;
        }
        if (stats.hasWarnings()) {
            log(info.warnings());
        }
        callback();
    });
});