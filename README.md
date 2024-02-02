# vscode-auto-cypress-tag

## Overview

VSCode Auto Cypress Tag is a simple extension for Visual Studio Code that helps you add `data-cy` attributes to HTML tags in your Vue files. It automates the process of generating unique identifiers for Cypress testing.

## Features

- Adds `data-cy` attributes to HTML tags in Vue files.
- Generates unique identifiers using UUIDs.
- Avoids specified tags (e.g., TEMPLATE, SCRIPT) based on user preferences.

## Installation

1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar on the side of the window or use the keyboard shortcut `Ctrl + Shift + X`.
3. Search for "VSCode Auto Cypress Tag".
4. Click the "Install" button.

## Usage

1. Open a Vue file in Visual Studio Code.
2. Click on the "Add Cypress Tag" button in the status bar.
3. The extension will add `data-cy` attributes to relevant HTML tags in the file.

## Configuration

You can configure the extension by modifying the settings in your `settings.json` file.

- `"autoCypressTag.tagsToAvoid"`: Specify tags to avoid adding `data-cy` attributes.

## Contribution

Feel free to contribute to this project by reporting issues or submitting pull requests on [GitHub](https://github.com/YUN-CHIEN-LO/vscode-auto-cypress-tag.git).

## License

This extension is licensed under the [MIT License](LICENSE.md).