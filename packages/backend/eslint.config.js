import { defineConfig } from 'eslint-define-config';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
	root: false,
	files: ['packages/backend/**/*.{ts,tsx}'],
	extends: [
		// Extend from the root ESLint configuration
		'../../eslint.config.js',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended'
	],
	parserOptions: {
		project: './packages/backend/tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module'
	},
	rules: {}
});
