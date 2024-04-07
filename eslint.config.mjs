import eslint from '@antfu/eslint-config'

export default eslint(
  {
    rules: {
      'curly': ['error', 'all'],
      'react-hooks/rules-of-hooks': ['error'],
      'react-hooks/exhaustive-deps': ['error'],
      'react-refresh/only-export-components': ['error'],
    },
    typescript: true,
    // https://github.com/facebook/react/pull/28773
    // TODO: upgrade eslint to v9 when it's merged
    react: true,
  },
)
