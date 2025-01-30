import { defineConfig } from 'eslint-define-config';

export default defineConfig({
	root: true,
	env: {
		node: true,
		jest: true
	},
	ignorePatterns: ['node_modules/', 'dist/', 'build/', '**/*.js'],
	extends: [
		'eslint:recommended',
		'plugin:prettier/recommended',
		'plugin:@typescript-eslint/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module'
	},
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off'
	}
});
