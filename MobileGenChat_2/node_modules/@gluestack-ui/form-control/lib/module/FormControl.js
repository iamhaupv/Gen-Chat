function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { forwardRef } from 'react';
import { useFormControlProvider, FormControlContext } from './useFormControl';
const FormControl = StyledFormControlBox => /*#__PURE__*/forwardRef(({
  ...props
}, ref) => {
  const {
    htmlProps,
    ...context
  } = useFormControlProvider(props);
  const {
    isDisabled,
    isInvalid,
    ...remainingProps
  } = context;
  return /*#__PURE__*/React.createElement(FormControlContext.Provider, {
    value: context
  }, /*#__PURE__*/React.createElement(StyledFormControlBox, _extends({
    ref: ref
  }, remainingProps, htmlProps, {
    states: {
      disabled: isDisabled,
      invalid: isInvalid
    },
    dataSet: {
      disabled: isDisabled ? 'true' : 'false',
      invalid: isInvalid ? 'true' : 'false'
    }
  })));
});
export default FormControl;
//# sourceMappingURL=FormControl.js.map