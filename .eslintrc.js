module.exports = {
    "extends": ["airbnb-base", "react-app"],
    "rules": {
        "indent": ["error", "tab"],
        "no-tabs": "off",
        "no-console": ["error", {"allow": ["log"]}],
        "comma-dangle": ["error", "never"],
        "no-shadow": "off",
        "class-methods-use-this": ["error", { "exceptMethods": ["render"] }],
        "max-len": "off",
        "no-underscore-dangle": ["error", {"allow": ["__ENV__"]}]
    }
};
