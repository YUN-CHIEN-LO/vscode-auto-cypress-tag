# VSCode Auto Cypress Tag

## Overview

VSCode Auto Cypress Tag is a simple extension for Visual Studio Code that adds data-cy attributes to HTML tags in Vue files. It automatically generates unique identifiers for Cypress testing.

## Features

- Adds data-cy attributes to HTML tags in Vue files.
- Generates unique identifiers using UUID.

## Installation

1. Open Visual Studio Code.
2. Access extensions either by clicking on the Extensions tab in the Activity Bar on the side or using the shortcut `Ctrl + Shift + X`.
3. Click on the `...` button, then choose `Install from VSIX` and select the specified `.vsix` file.
4. Once the file is uploaded, the installation is complete.

## Usage

1. Open a Vue file in Visual Studio Code.
2. Click on the "Add Cypress Tag" button in the status bar.
3. The extension will add data-cy attributes to relevant HTML tags in the file.

## Maintenance Guidelines

1. Clone the project and run npm ci to install dependencies.
2. To execute the packaging process, globally install `npm i -g vsce && npm install -g webpack && install -g typescript `
3. Compile, pack, and install the project: `npm run build`
4. Project scaffolding:https://code.visualstudio.com/api/get-started/your-first-extension

## 資料夾結構

```plain
VueCypressTagGenerator/
    ├─  .vscode/ ------------------------- vscode configuration
    ├─  assets/ -------------------------- static resources
    ├─  dist/ ---------------------------- packaged compilation results
    ├─  node_modules/ -------------------- npm packages
    ├─  src/ ----------------------------- functionality logic and implementation
    ├─  .eslintrc.json ------------------- eslint configuration
    ├─  .gitignore ----------------------- git ignore configuration
    ├─  CHANGELOG.md --------------------- version history
    ├─  LICENSE.md ----------------------- license file
    ├─  package-lock.json ---------------- npm package version lock
    ├─  package.json --------------------- npm package configuration
    ├─  README.md ------------------------ plugin documentation
    ├─  tsconfig.json -------------------- typescript configuration
    ├─  vscode-auto-cypress-tag.vsix ----- package installation file
    └─  webpack.config.js ---------------- webpack configuration
```

## Wishlist

1. Complete unit tests.
2. Implement automatic versioning for the package maintenance.
3. Wishlist for expanding snippet or emmet functionality, enabling tab expansion and insertion of a randomly generated UUID after typing `data-cy` in templates.

## License

This extension is licensed under the [MIT License](LICENSE.md).
