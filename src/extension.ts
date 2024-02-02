import * as vscode from "vscode";

function isVueFile(document: vscode.TextDocument): boolean {
  return document.languageId === "vue";
}

function generateUUID(): string {
  return "xxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function addDataCyAttribute(editor: vscode.TextEditor): void {
  const document = editor.document;
  const edit = new vscode.WorkspaceEdit();

  for (let i = 0; i < document.lineCount; i++) {
    const line = document.lineAt(i);
    const regex = /<([a-zA-Z0-9-]+)(?=\s|>)([^>]*)>/g;

    let match;
    while ((match = regex.exec(line.text)) !== null) {
      const tagName = match[1];
      const attributes = match[2];

      // Check if the tag is in the list to be avoided
      const tagNamesToAvoid = [
        "TEMPLATE",
        "SCRIPT",
        "STYLE",
        "TRANSITION",
        "TRANSITION-GROUP",
        "KEEPALIVE",
        "TELEPORT",
        "SUSPENSE",
      ];
      if (tagNamesToAvoid.includes(tagName.toUpperCase())) {
        // Skip adding 'data-cy' attribute for this tag
        console.log(`Skipping tag: ${tagName}`);
        continue;
      }

      // Check if the tag already has a 'data-cy' attribute
      if (!/\bdata-cy\b/.test(attributes)) {
        // Add 'data-cy' attribute inside the tag
        const startPosition = new vscode.Position(
          i,
          match.index + match[0].length - 1
        );
        const endPosition = new vscode.Position(
          i,
          match.index + match[0].length - 1
        );
        const range = new vscode.Range(startPosition, endPosition);
        const text = ` data-cy="${tagName}-${generateUUID()}"`;

        edit.insert(document.uri, range.end, text);
      }
    }
  }

  vscode.workspace.applyEdit(edit);
}

export function activate(context: vscode.ExtensionContext) {
  const addTagButton = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left
  );
  addTagButton.text = "$(tag) Add data-cy Attribute";
  addTagButton.command = "vscode-auto-cypress-tag.addCypressTag";
  context.subscriptions.push(addTagButton);

  const addDataCyAttributeCommand = vscode.commands.registerCommand(
    "vscode-auto-cypress-tag.addCypressTag",
    () => {
      const editor = vscode.window.activeTextEditor;

      if (editor) {
        const document = editor.document;

        if (isVueFile(document)) {
          addDataCyAttribute(editor);
        } else {
          vscode.window.showErrorMessage(
            "This command can only be applied to Vue files."
          );
        }
      }
    }
  );

  context.subscriptions.push(addDataCyAttributeCommand);
  addTagButton.show();
}

export function deactivate() {}
