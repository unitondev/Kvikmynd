const CopyWebpackPlugin = require('copy-webpack-plugin')
const  path = require('path')

module.exports = function override(config, env) {
  config.devtool = 'source-map'
  config.resolve = {
    alias: {
      "@movie/routes": path.resolve(__dirname, 'src/Routes'),
      "@movie/modules": path.resolve(__dirname, 'src/modules'),
      "@movie/shared": path.resolve(__dirname, 'src/modules/shared'),
      "@movie/services": path.resolve(__dirname, 'src/services'),
    }
  }

  return config
}
