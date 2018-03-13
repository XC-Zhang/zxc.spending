module.exports = {
    entry: {
        styles: "./public/styles/app.scss",
        scripts: "./public/scripts/app.js"
    },
    output: {
        filename: "[name]/bundle.js"
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                {
                    loader: "file-loader",
                    options: {
                        name: "bundle.css",
                        outputPath: "styles/"
                    }
                },
                { loader: "extract-loader" },
                { 
                    loader: "css-loader",
                    options: {
                        minimize: true
                    }
                },
                { 
                    loader: "sass-loader",
                    options: {
                        importer: function (url, prev) {
                            if (url.indexOf("@material") === 0) {
                                const filePath = url.split("@material")[1];
                                const nodeModulePath = `./node_modules/@material/${filePath}`;
                                return {
                                    file: require("path").resolve(nodeModulePath)
                                };
                            }
                            if (url.indexOf("vue-mdc-adapter") === 0) {
                                const filePath = url.split("vue-mdc-adapter")[1];
                                const nodeModulePath = `./node_modules/vue-mdc-adapter/${filePath}`;
                                return {
                                    file: require("path").resolve(nodeModulePath)
                                };
                            }
                            return { file: url };
                        }
                    }
                }
            ]
        }, {
            test: /\.vue$/,
            loader: "vue-loader"
        }]
    }
};
