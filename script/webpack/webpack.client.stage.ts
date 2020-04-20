import * as webpack from "webpack";
import * as merge from 'webpack-merge';
import * as path from 'path';

import commonWebpackConfiguration from "./webpack.common";

const configuration: webpack.Configuration = merge(commonWebpackConfiguration, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    entry: path.resolve(__dirname, "../../client/Root.tsx"),
    output: {
        filename: 'stage.bundle.js',
        path: path.resolve(__dirname, "../../public/static/bundle")
    },
    externals: {
        'react-dom': 'ReactDOM',
        'react': 'React',
        'moment': 'moment',
        'bizcharts': 'BizCharts',
        'OSS': 'OSS'
    }
})

export default configuration;