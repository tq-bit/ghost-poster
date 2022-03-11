const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = (env) => {
  return {
    mode: 'production',
    entry: path.resolve(__dirname, 'src/index.ts'),
    devtool: 'source-map',
    target: 'node',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
        },
      ],
    },
    externals: [nodeExternals()],
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },
    optimization: {},
    plugins: [],
  };
};
