module.exports = {
  chainWebpack: config => {
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // Provide path to the file with resources
          resources: './src/scss/style.scss',

          // Or array of paths
          resources: ['./src/scss/misc.scss', './src/scss/tags.scss']
        })
        .end()
    })
  }
}