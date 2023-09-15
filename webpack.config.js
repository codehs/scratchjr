const webpack = require("webpack");
const WebpackNotifierPlugin = require("webpack-notifier");

module.exports = (env, argv) => {
    const isProduction = argv.mode === "production";
    const assetBaseURL = isProduction
        ? "https://codehs.com/scratchjr_assets/"
        : "http://localhost:8000/static/scratchjr_assets/";

    return {
        devtool: "source-map",
        entry: {
            app: "./src/entry/app.js",
        },
        output: {
            publicPath: assetBaseURL,
            path: __dirname + "/src/build/bundles",
            filename: "[name].bundle.js",
        },
        performance: {
            hints: false,
        },
        watchOptions: {
            ignored: ["node_modules", "src/build/**/*"],
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    include: /node_modules/,
                    loaders: ["strip-sourcemap-loader"],
                },
                {
                    loader: "babel-loader",
                    exclude: /node_modules/,
                    test: /\.jsx?$/,
                    query: {
                        presets: ["es2015", "stage-3"],
                    },
                },
                {
                    test: /\.wasm$/,
                    type: "javascript/auto",
                },
            ],
        },
        plugins: [
            new WebpackNotifierPlugin({
                title: "ScratchJr",
                alwaysNotify: true,
            }),
            // Define a global constant for asset URLs that can be used anywhere in the code
            new webpack.DefinePlugin({
                ASSET_BASE_URL: JSON.stringify(assetBaseURL),
            }),
        ],
        node: {
            fs: "empty",
        },
        devServer: {
            disableHostCheck: true,
            // https://stackoverflow.com/questions/31602697/webpack-dev-server-cors-issue
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods":
                    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Headers":
                    "X-Requested-With, content-type, Authorization",
            },
        },
    };
};
