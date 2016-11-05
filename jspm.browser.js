SystemJS.config({
  production: true,
  paths: {
    "npm:react@15.3.2": "jspm_packages/npm/react@15.3.2/dist/react.min.js",
    "npm:react-dom@15.3.2": "jspm_packages/npm/react-dom@15.3.2/dist/react-dom.min.js",
    "github:": "jspm_packages/github/",
    "npm:": "jspm_packages/npm/"
  }
});