"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createImage = createImage;
var _Image = require("./Image");
function createImage({
  Root
}) {
  const Image = (0, _Image.Image)(Root);
  Image.displayName = 'Image';
  return Image;
}
//# sourceMappingURL=index.js.map