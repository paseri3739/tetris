const path = require("path");

module.exports = {
    mode: "development", // 開発モード
    entry: "./src/main.ts", // エントリーポイント
    module: {
        rules: [
            {
                test: /\.ts$/, // .tsファイルに対する処理
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"], // 省略できる拡張子の指定
    },
    output: {
        filename: "bundle.js", // 出力されるファイル名
        path: path.resolve(__dirname, "dist"), // 出力ディレクトリ
    },
    devtool: "source-map", // ソースマップの生成
};
