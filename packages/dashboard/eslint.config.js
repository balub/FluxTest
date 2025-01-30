import { defineConfig } from 'eslint-define-config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
	root: false,
	files: ['packages/frontend/**/*.{ts,tsx}'],
	extends: [
		// Extend from the root ESLint configuration
		'../../eslint.config.js',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended'
	],
	parserOptions: {
		project: './packages/frontend/tsconfig.json',
		tsconfigRootDir: __dirname
	},
	plugins: {
		'react-hooks': reactHooks,
		'react-refresh': reactRefresh
	},
	languageOptions: {
		globals: globals.browser
	},
	rules: {
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true }
		],
		...reactHooks.configs.recommended.rules
	}
});
