/** @type {import('eslint').Linter.Config} */
module.exports = {
	root: true,
	env: { node: true, es2024: true },
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking'
	],
	ignorePatterns: ['.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json'
	},
	plugins: [
		'@stylistic',
		'@typescript-eslint',
		'simple-import-sort'
	],
	rules: {
		'simple-import-sort/imports': 'warn',
		'simple-import-sort/exports': 'warn',
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{
				vars: 'all',
				args: 'after-used',
				argsIgnorePattern: '^_'
			}
		],
		'@typescript-eslint/no-empty-function': 'warn',
		'@typescript-eslint/no-empty-interface': 'warn',
		'@typescript-eslint/consistent-type-imports': [
			'warn',
			{
				fixStyle: 'inline-type-imports'
			}
		],
		'@stylistic/quotes': ['warn', 'single', { 'avoidEscape': true }]
	}
}