"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTextArea = createTextArea;
exports.createTextarea = createTextarea;
var _Textarea = require("./Textarea");
var _TextareaRoot = require("./TextareaRoot");
//TODO: deprecate later
/**
 * @deprecated The method should not be used, use createTextarea instead
 */
function createTextArea({
  Root,
  Input
}) {
  const TextareaTemp = (0, _TextareaRoot.TextareaRoot)(Root);
  TextareaTemp.Input = (0, _Textarea.Textarea)(Input);
  TextareaTemp.displayName = 'Textarea';
  TextareaTemp.Input.displayName = 'Textarea.Input';
  return TextareaTemp;
}
function createTextarea({
  Root,
  Input
}) {
  const TextareaTemp = (0, _TextareaRoot.TextareaRoot)(Root);
  TextareaTemp.Input = (0, _Textarea.Textarea)(Input);
  TextareaTemp.displayName = 'Textarea';
  TextareaTemp.Input.displayName = 'Textarea.Input';
  return TextareaTemp;
}
//# sourceMappingURL=index.js.map