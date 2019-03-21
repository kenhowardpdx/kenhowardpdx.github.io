module.exports = {
  extends: [
    'standard',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['standard', 'react'],
  rules: {
    // eslint - options
    semi: ['error', 'always'],

    // standard plugin - options
    'standard/object-curly-even-spacing': ['error', 'either'],
    'standard/array-bracket-even-spacing': ['error', 'either'],
    'standard/computed-property-even-spacing': ['error', 'even'],
    'standard/no-callback-literal': ['error', ['cb', 'callback']],

    // react plugin - options
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',

    // @typescript-eslint - options
    '@typescript-eslint/indent': ['error', 2]
  }
};
