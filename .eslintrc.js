module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'error',
        'no-console': 'warn',
    },
};
