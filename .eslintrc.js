module.exports = {
	env: {
		node: true
	},

	extends: [
		'plugin:vue/recommended',
		'eslint:all'
	],

	overrides: [
		{
			env: {
				mocha: true
			},
			files: ['**/__tests__/*.{j,t}s?(x)']
		},
		{
			files: ['*.vue'],
			rules: {
				indent: 'off',
				'sort-keys': 'off'
			}
		},
		{
			files: ['router.js'],
			rules: {
				'no-inline-comments': 'off'
			}
		}
	],

	parserOptions: {
		parser: 'babel-eslint'
	},

	root: true,

	rules: {
		'multiline-comment-style': 'off',
		'capitalized-comments': 'off',
		'default-case': 'off',
		'dot-location': [
			'error',
			'property'
		],
		'func-names': [
			'error',
			'as-needed'
		],
		'id-length': [
			'error',
			{
				exceptions: [
					'x',
					'y',
					'z',
					'i',
					'j',
					'k',
					'h',
					'w'
				]
			}
		],
		indent: [
			'error',
			'tab',
			{
				SwitchCase: 1
			}
		],
		'max-len': [
			'error',
			{
				code: 160,
				tabWidth: 2
			}
		],
		'max-lines': [
			'error',
			{
				max: 500
			}
		],
		'max-lines-per-function': [
			'error',
			90
		],
		'max-params': [
			'error',
			6
		],
		'max-statements': [
			'error',
			25
		],
		'multiline-ternary': [
			'error',
			'always-multiline'
		],
		'no-confusing-arrow': 'off',
		'no-console': 'off',
		'no-debugger': 'off',
		'no-extra-parens': 'off',
		'no-magic-numbers': 'off',
		'no-nested-ternary': 'off',
		'no-plusplus': [
			'error',
			{
				allowForLoopAfterthoughts: true
			}
		],
		'no-tabs': [
			'error',
			{
				allowIndentationTabs: true
			}
		],
		'no-process-env': 'off',
		'no-ternary': 'off',
		'no-warning-comments': 'off',
		'one-var': [
			'error',
			'never'
		],
		'operator-linebreak': [
			'error',
			'before'
		],
		'padded-blocks': [
			'error',
			'never'
		],
		'prefer-promise-reject-errors': [
			'error',
			{
				allowEmptyReject: true
			}
		],
		'quote-props': [
			'error',
			'as-needed'
		],
		quotes: [
			'error',
			'single'
		],
		'space-before-function-paren': [
			'error',
			'never'
		],
		'sort-keys': 'off',
		'sort-vars': 'off',
		'vue/array-bracket-spacing': 'error',
		'vue/arrow-spacing': 'error',
		'vue/attribute-hyphenation': [
			0,
			{
				ignore: ['custom-prop']
			}
		],
		'vue/brace-style': 'error',
		'vue/camelcase': 'error',
		'vue/comma-dangle': 'error',
		'vue/component-name-in-template-casing': [
			2,
			'kebab-case',
			{
				registeredComponentsOnly: false
			}
		],
		'vue/eqeqeq': 'error',
		'vue/html-closing-bracket-newline': [
			'error',
			{
				multiline: 'never',
				singleline: 'never'
			}
		],
		'vue/html-closing-bracket-spacing': [
			'error',
			{
				endTag: 'never',
				selfClosingTag: 'always',
				startTag: 'never'
			}
		],
		'vue/html-indent': [
			'error',
			'tab'
		],
		'vue/key-spacing': 'error',
		'vue/match-component-file-name': [
			'error',
			{
				extensions: [
					'vue',
					'jsx',
					'js'
				],
				shouldMatchCase: true
			}
		],
		'vue/max-attributes-per-line': [
			'error',
			{
				singleline: 4
			}
		],
		'vue/no-restricted-syntax': 'error',
		'vue/object-curly-spacing': 'error',
		'vue/require-direct-export': 'error',
		'vue/script-indent': [
			'error',
			'tab',
			{
				switchCase: 1
			}
		],
		'vue/singleline-html-element-content-newline': 'off',
		'vue/space-infix-ops': 'error',
		'vue/space-unary-ops': 'error',
		'vue/v-on-function-call': 'error',
		'function-call-argument-newline': 0
	}
};
