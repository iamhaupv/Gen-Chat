"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProvider = void 0;
var _Provider = require("./Provider");
const createProvider = ({
  StyledProvider
}) => {
  const GluestackUIStyledProvider = (0, _Provider.Provider)({
    StyledProvider
  });
  GluestackUIStyledProvider.displayName = 'GluestackUIStyledProvider';
  return GluestackUIStyledProvider;
};
exports.createProvider = createProvider;
//# sourceMappingURL=index.js.map