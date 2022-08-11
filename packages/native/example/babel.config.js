module.exports = (api) => {
  api.cache(true)
  
  return {
    presets: [
      'module:metro-react-native-babel-preset'
    ],
    plugins: [
      ['module-resolver', {
        alias: {
          '@Models': './src/Models',
          '@Screens': './src/Screens',
          '@Components': './src/Components',
        }
      }]
    ]
  }
}
