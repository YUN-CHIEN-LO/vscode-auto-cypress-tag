import * as vscode from "vscode";
import VueStringProcessor from "./processor";

/**
 * 判斷是否為 vue 檔
 * @param {vscode.TextDocument} document - 編輯器文件
 * @returns {boolean} - 是否為 vue 檔
 */
function isVueFile(document: vscode.TextDocument): boolean {
  return document.languageId === "vue";
}

/**
 * 為 vue 檔中的所有 html 標籤加上 'data-cy' 標籤
 *
 * @param {vscode.TextEditor} editor - 當前開啟的編輯器
 */
function addDataCyAttribute(editor: vscode.TextEditor): void {
  // 當前編輯的文件
  const document = editor.document;
  // 工作區編輯實例
  const edit = new vscode.WorkspaceEdit();

  // 取得編輯文件範圍
  const entireRange = new vscode.Range(
    editor.document.positionAt(0),
    editor.document.positionAt(document.getText().length)
  );

  // 取得編輯文件字串
  const entireContent = document.getText();
  // 取得插入 data-cy 標籤後的字串
  const newText = VueStringProcessor(entireContent);
  // 替換文件內容
  edit.replace(document.uri, entireRange, newText);
  // 更新文件
  vscode.workspace.applyEdit(edit);
}

/**
 * 啟用插件
 * @param {vscode.ExtensionContext} context - 啟用插件背景數據
 */
export function activate(context: vscode.ExtensionContext) {
  // 插入按鈕
  const addTagButton = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left
  );
  // 按鈕標題
  addTagButton.text = "$(tag) Add data-cy Attribute";
  // 按鈕觸發指令
  addTagButton.command = "vscode-auto-cypress-tag.addCypressTag";
  // 按鈕加入工劇烈
  context.subscriptions.push(addTagButton);

  // 註冊指令
  const addDataCyAttributeCommand = vscode.commands.registerCommand(
    "vscode-auto-cypress-tag.addCypressTag",
    () => {
      const editor = vscode.window.activeTextEditor;

      // 找不到編輯器，拋出錯誤並返回
      if (!editor) {
        vscode.window.showErrorMessage("Editor not found.");
        return;
      }

      // 編輯文件
      const document = editor.document;

      // 文件不是 .vue 檔，拋出錯誤並返回
      if (!isVueFile(document)) {
        vscode.window.showErrorMessage(
          "The Cypress Tag plugin only applies to .vue files."
        );
        return;
      }

      // 新增 data-cy 標籤
      addDataCyAttribute(editor);
    }
  );

  // 訂閱指令
  context.subscriptions.push(addDataCyAttributeCommand);
  // 顯示按鈕
  addTagButton.show();
}

/**
 * 停用插件
 */
export function deactivate() {}
