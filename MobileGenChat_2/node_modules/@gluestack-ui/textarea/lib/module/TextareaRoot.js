function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { forwardRef } from 'react';
import { TextareaProvider } from './TextareaContext';
import { useHover } from '@react-native-aria/interactions';
import { useFormControlContext } from '@gluestack-ui/form-control';
import { mergeRefs } from '@gluestack-ui/utils';
import { useFocusRing } from '@react-native-aria/focus';
export const TextareaRoot = StyledTextareaRoot => /*#__PURE__*/forwardRef(({
  children,
  isDisabled,
  isInvalid,
  isReadOnly,
  isRequired,
  isHovered = false,
  isFocused: isFocusedProp = false,
  isFocusVisible: isFocusVisibleProp,
  ...props
}, ref) => {
  const inputRef = React.useRef();
  const {
    isHovered: isHoveredProp
  } = useHover({}, inputRef);
  const {
    isFocusVisible
  } = useFocusRing();
  const [isFocused, setIsFocused] = React.useState(false);
  const handleFocus = (focusState, callback) => {
    setIsFocused(focusState);
    callback();
  };
  const inputProps = useFormControlContext();
  return /*#__PURE__*/React.createElement(StyledTextareaRoot, _extends({
    states: {
      hover: isHovered || isHoveredProp,
      focus: isFocusedProp || isFocused,
      disabled: isDisabled || inputProps.isDisabled,
      invalid: isInvalid || inputProps.isInvalid,
      readonly: isReadOnly || inputProps.isReadOnly,
      required: isRequired || inputProps.isRequired,
      focusVisible: isFocusVisibleProp || isFocusVisible
    },
    dataSet: {
      hover: isHovered || isHoveredProp ? 'true' : 'false',
      focus: isFocusedProp || isFocused ? 'true' : 'false',
      disabled: isDisabled || inputProps.isDisabled ? 'true' : 'false',
      invalid: isInvalid || inputProps.isInvalid ? 'true' : 'false',
      readonly: isReadOnly || inputProps.isReadOnly ? 'true' : 'false',
      required: isRequired || inputProps.isRequired ? 'true' : 'false',
      focusVisible: isFocusVisibleProp || isFocusVisible ? 'true' : 'false'
    }
  }, props, {
    ref: mergeRefs([inputRef, ref])
  }), /*#__PURE__*/React.createElement(TextareaProvider, {
    isDisabled: isDisabled || inputProps.isDisabled,
    isInvalid: isInvalid || inputProps.isInvalid,
    isFocused: isFocusedProp ? isFocusedProp : isFocused,
    isHovered: isHovered ? isHovered : isHoveredProp,
    isReadOnly: isReadOnly || inputProps.isReadOnly,
    isRequired: isRequired || inputProps.isRequired,
    inputRef: inputRef,
    handleFocus: handleFocus
  }, children));
});
//# sourceMappingURL=TextareaRoot.js.map