module.exports = {
    'extends': [
        'react-app',
        'react-app/jest',
        'plugin:jsx-a11y/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
    ],
    'plugins': ['simple-import-sort'],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaVersion': 2022,
        'project': './tsconfig.json',
        'tsconfigRootDir': '.',
    },
    'rules': {
        'eol-last': ['error', 'always'],
        'block-spacing': ['error', 'always'],
        'space-before-function-paren': ['error', {'anonymous': 'always', 'named': 'never'}],
        'space-in-parens': ['error', 'never'],
        'object-curly-spacing': ['error', 'never'],
        'lines-between-class-members': ['error', 'always', {exceptAfterSingleLine: true}],
        'spaced-comment': ['error', 'always', {'exceptions': ['-', '+']}],
        'arrow-spacing': ['error', {'before': true, 'after': true}],
        'array-bracket-spacing': ['error', 'never'],
        'computed-property-spacing': ['error', 'never'],
        'template-curly-spacing': ['error', 'never'],
        'object-property-newline': ['off', {'allowMultiplePropertiesPerLine': true}],
        'no-plusplus': ['error', {'allowForLoopAfterthoughts': true}],
        'comma-dangle': ['error', 'always-multiline'],
        'quotes': ['error', 'single', {'avoidEscape': true}],
        'react/jsx-tag-spacing': ['error', {beforeSelfClosing: 'always'}],
        '@typescript-eslint/no-use-before-define': ['error', {'functions': false, 'classes': true}],
        '@typescript-eslint/member-ordering': ['error'],
        '@typescript-eslint/explicit-function-return-type': ['error', {
            allowExpressions: true,
            allowConciseArrowFunctionExpressionsStartingWithVoid: true,
        }],
        '@typescript-eslint/unbound-method': ['error', {ignoreStatic: true}],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['off'],
        '@typescript-eslint/no-unsafe-argument': ['off'],
        'semi': 'off',
        '@typescript-eslint/semi': ['error'],
        'simple-import-sort/imports': [
            'error',
            {
                "groups": [
                    ["^@", "^react$", "^next", "^~", "^[a-z]"],
                    ["^\\.\\.(?!/?$)", "^\\.\\./?$", "^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"], // `../` & `./`
                    ["^.+\\.s?css$"], // Style imports
                    ["^\\u0000"], // Side effect imports
                ]
            }
        ],
    },
    'env': {
        'browser': true,
        'es6': true,
    }
};
