import * as webpack from "webpack";

const configuration: webpack.Configuration = {
    entry: {

    },
    output: {

    },
    resolve: {
        plugins: [

        ],
        extensions: [".ts", ".tsx", ".js", ".jsx", '.styl']
    },
    devtool: "source-map",
    module: {
        rules: [
            { test: /\.tsx?$/, use: { loader: 'ts-loader' } },
            {
                test: /\.styl$/,
                use: [
                  'style-loader',
                  'css-loader',
                  {
                    loader: 'stylus-loader',
                  },
                ],
              }
        ]
    },
    plugins: [
    ]
}

export default configuration