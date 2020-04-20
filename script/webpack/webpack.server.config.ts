import * as webpack from "webpack";
import * as merge from 'webpack-merge';
import * as path from 'path';
import * as nodeExternals from 'webpack-node-externals';

import commonWebpackConfiguration from "./webpack.common";

const configuration:webpack.Configuration = merge(commonWebpackConfiguration,{
    entry: path.resolve(__dirname, "../../server/server.ts"),
    mode: 'production',
    devtool: 'cheap-module-source-map',
    target: 'node',
    externals: [nodeExternals()],
    output:{
        filename: 'server.bundle.js',
        path: path.resolve(__dirname, "../../bundle/application")
    }
})

export default configuration;