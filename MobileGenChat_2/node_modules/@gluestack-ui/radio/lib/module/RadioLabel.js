function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { forwardRef } from 'react';
import { useRadio } from './RadioProvider';
export const RadioLabel = StyledRadioLabel => /*#__PURE__*/forwardRef(({
  children,
  ...props
}, ref) => {
  const {
    isHovered,
    isChecked,
    isDisabled,
    isFocusVisible,
    isInvalid,
    isReadOnly,
    isIndeterminate,
    isFocused,
    isPressed
  } = useRadio('RadioContext');
  return /*#__PURE__*/React.createElement(StyledRadioLabel, _extends({
    states: {
      checked: isChecked,
      disabled: isDisabled,
      focusVisible: isFocused || isFocusVisible,
      hover: isHovered,
      invalid: isInvalid,
      readonly: isReadOnly,
      indeterminate: isIndeterminate,
      focus: isFocused,
      active: isPressed
    },
    dataSet: {
      checked: isChecked ? 'true' : 'false',
      disabled: isDisabled ? 'true' : 'false',
      focusVisible: isFocused || isFocusVisible ? 'true' : 'false',
      hover: isHovered ? 'true' : 'false',
      invalid: isInvalid ? 'true' : 'false',
      readonly: isReadOnly ? 'true' : 'false',
      indeterminate: isIndeterminate ? 'true' : 'false',
      focus: isFocused ? 'true' : 'false',
      active: isPressed ? 'true' : 'false'
    }
  }, props, {
    ref: ref
  }), children);
});
//# sourceMappingURL=RadioLabel.js.map