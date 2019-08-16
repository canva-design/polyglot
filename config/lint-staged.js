module.exports = {
  "*.{js,ts,tsx}": ["eslint --fix", "git add"],
  "*.{css}": ["stylelint --fix", "git add"],
  "*.{json,js,css}": ["prettier --write", "git add"],
};
