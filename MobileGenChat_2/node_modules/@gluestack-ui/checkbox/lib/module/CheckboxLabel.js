function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { forwardRef } from 'react';
import { useCheckbox } from './CheckboxProvider';
const CheckboxLabel = StyledCheckboxLabel => /*#__PURE__*/forwardRef(({
  children,
  ...props
}, ref) => {
  const {
    isChecked,
    isDisabled,
    isHovered,
    isInvalid,
    isReadOnly,
    isPressed,
    isFocused,
    isIndeterminate,
    isFocusVisible
  } = useCheckbox('CheckboxContext');
  return /*#__PURE__*/React.createElement(StyledCheckboxLabel, _extends({
    states: {
      hover: isHovered,
      checked: isChecked,
      disabled: isDisabled,
      focusVisible: isFocusVisible,
      invalid: isInvalid,
      readOnly: isReadOnly,
      pressed: isPressed,
      focused: isFocused,
      indeterminate: isIndeterminate
    },
    dataSet: {
      hover: isHovered ? 'true' : 'false',
      checked: isChecked ? 'true' : 'false',
      disabled: isDisabled ? 'true' : 'false',
      focusVisible: isFocusVisible ? 'true' : 'false',
      invalid: isInvalid ? 'true' : 'false',
      readOnly: isReadOnly ? 'true' : 'false',
      pressed: isPressed ? 'true' : 'false',
      focused: isFocused ? 'true' : 'false',
      indeterminate: isIndeterminate ? 'true' : 'false'
    }
  }, props, {
    ref: ref
  }), children);
});
export default CheckboxLabel;
//# sourceMappingURL=CheckboxLabel.js.map