module.exports = {
  "extends":[
    "airbnb",
    "react-app"
  ],
  "globals": {
    "window": true,
    "document": true,
    "localStorage": true
  },
  "rules": {
    "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/anchor-is-valid": ["warn", { "aspects": ["invalidHref"] }],
    "no-nested-ternary": "off",
    "jsx-a11y/label-has-for": "off"
  }
};