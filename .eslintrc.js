// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,

  rules: {
    'max-len': 0,
    'vue/require-component-is': 0,
    'no-underscore-dangle': 0,
    'no-case-declarations': 0,
    'import/no-cycle': 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },

  env: {
    node: true,
  },

  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],

  parserOptions: {
    parser: 'babel-eslint',
  },
};
