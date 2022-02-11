const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = function override(config, env) {
  config.devtool = 'source-map'
  return config
}
