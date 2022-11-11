module.exports = {
  "extends": ["react-app", "plugin:jsx-a11y/recommended", "prettier"],
  "plugins": ["jsx-a11y", "prettier"],
  "overrides": [
    {
      "files": ["**/*.test.{ts,tsx}"],
      "plugins": ["jest"],
      "extends": ["plugin:jest/recommended"],
    }
  ],
  "rules": {
    "prettier/prettier": "warn",
    "no-console": "error",

    // Temporarily disabled rules
    "@typescript-eslint/no-explicit-any": "off",
    "import/no-anonymous-default-export": "off",
    "jsx-a11y/no-autofocus": "off",
  }
}

