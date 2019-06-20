module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
  ],
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: 'last 3 versions',
        ie: '11',
      },
    }],
    '@babel/preset-react',
  ]
};
