import * as cheerio from "cheerio";
import generateUUID from "./uuid";

// 樣板字串正規表達式
const templateRegex =
  /^<template>([\s\S]+)<\/template>(?=(\s+(<script|<style|$)))/;
// 需要檢查的 attribute
const attributesToCheck = ["data-cy", ":data-cy"];
// 需要跳過的 html tag (白名單元件)
const tagNamesToAvoid = [
  "TEMPLATE",
  "SCRIPT",
  "STYLE",
  "TRANSITION",
  "TRANSITIONGROUP",
  "KEEPALIVE",
  "TELEPORT",
  "SUSPENSE",
];

/**
 * 解析單一 .vue 檔字串，並適時加上 data-cy 標籤
 *
 * @param {string} fileContent - vue 字串
 * @param {string} 更新 data-cy 後的字串
 */
export default function processVueFile(fileContent: string): string {
  // 擷取 template 字串
  const match = fileContent.match(templateRegex);
  // 找不到樣板，返回原始字串
  if (!match) {
    return fileContent;
  }

  // 取得樣板字串
  const templateContent = match[1];
  // 初始 cheerio
  const $ = cheerio.load(templateContent, {
    xmlMode: true,
    decodeEntities: false,
  });

  /**
   * 解析單一 html 元件
   *
   * @param {cheerio.Element} element - html 元件
   */
  const processElementTag = (element: cheerio.Element) => {
    // html 元件
    const $element = $(element);
    // 是否已存在 data-cy
    const hasAttribute = attributesToCheck.some((attribute) =>
      $element.attr(attribute)
    );
    // 是否為白名單元件
    const shouldAvoid = tagNamesToAvoid.includes($element.prop("tagName"));
    // 不做任何調整
    if (shouldAvoid || hasAttribute) {
      return;
    }
    // 插入 data-cy 標籤
    $element.prop("data-cy", generateUUID());
  };

  /**
   * 遞迴解析文件中的所有 html 元件
   *
   * @param {cheerio.Element} element - html 元件
   */
  const processNestedElement = (element: cheerio.Element) => {
    // 解析單一 html 元件
    processElementTag(element);

    // 若該 html 元件有子元件，遞迴解析
    if ((element as cheerio.TagElement).children) {
      (element as cheerio.TagElement).children.forEach(processNestedElement);
    }
  };

  // 從文件的根元件開始解析
  processNestedElement($.root()[0]);

  // 取得文件的 html 內容
  const updatedTemplateContent = $.html({
    xmlMode: true,
    decodeEntities: false,
  }).replace(/=""/g, "");

  // 替換字串內容
  const updatedFileContent = fileContent.replace(
    templateRegex,
    `<template>${updatedTemplateContent}</template>`
  );

  // 返回解析後的字串
  return updatedFileContent;
}
