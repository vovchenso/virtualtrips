const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const paths = {
    build: path.resolve("../build"),
    public: path.resolve("public"),
    entry: path.resolve("src/boot.tsx"),
    html: path.resolve("public/index.html"),
    src: path.resolve("src"),
    publicPath: path.resolve("/")
};

module.exports = env => {
    const isProdBuild = env && env.production;

    return {
        devtool: isProdBuild ? false : "cheap-module-source-map",

        devServer: {
            port: process.env.PORT || 7080,
            host: "0.0.0.0",
        },

        mode: isProdBuild ? "production" : "development",

        entry: paths.entry,

        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
            alias: {
                src: paths.src,
            }
        },

        output: {
            path: paths.build,
            filename: "[name].[chunkhash:8].js",
        },

        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: "ts-loader"
                }
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                inject: true,
                template: paths.html
            })
        ]
    };
};
