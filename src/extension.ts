import * as vscode from "vscode";

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context: vscode.ExtensionContext) {
  try {
    console.log("Extension activated!");

    const statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      10
    );
    statusBarItem.text = "$(tag) Cypress Tag";
    statusBarItem.tooltip = "Add Cypress Tag";
    statusBarItem.command = "vscode-auto-cypress-tag.addCypressTag";
    statusBarItem.show();

    context.subscriptions.push(statusBarItem);
    console.log("Status bar item added to subscriptions");

    // Register the command
    const disposable = vscode.commands.registerCommand(
      "vscode-auto-cypress-tag.addCypressTag",
      () => {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
          const position = editor.selection.active;
          editor.edit((editBuilder) => {
            editBuilder.insert(position, "add cypress tag");
          });
        }
      }
    );

    context.subscriptions.push(disposable);
  } catch (error) {
    console.error("Error during activation:", error);
    vscode.window.showErrorMessage(
      "Extension activation failed. Check output for details."
    );
  }
}

function deactivate() {}

export { activate, deactivate };
