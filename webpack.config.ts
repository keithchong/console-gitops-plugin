// @ts-ignore
import { ConsoleRemotePlugin } from '@openshift-console/dynamic-plugin-sdk/webpack';
import * as webpack from 'webpack';
import * as CopyPlugin from 'copy-webpack-plugin';
import * as path from 'path';

const config: webpack.Configuration = {
  context: path.resolve(__dirname, 'src'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]-bundle.js',
    chunkFilename: '[name]-chunk.js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /(\.jsx?)|(\.tsx?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
      },
    ],
  },
  plugins: [new ConsoleRemotePlugin(), new CopyPlugin([{ from: 'public' }])],
  devtool: 'source-map',
  optimization: {
    chunkIds: 'named',
    minimize: false,
  },
  externals: {
    '@openshift-console/dynamic-plugin-sdk/api': 'api',
  },
};

if (process.env.NODE_ENV === 'production') {
  config.mode = 'production';
  config.output.filename = '[name]-bundle-[hash].min.js';
  config.output.chunkFilename = '[name]-chunk-[chunkhash].min.js';
  config.optimization.chunkIds = 'deterministic';
  config.optimization.minimize = true;
}

export default config;
