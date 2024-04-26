import { InputIcon } from './InputIcon';
import { InputGroup } from './InputGroup';
import { InputSlot } from './InputSlot';
import { Input as InputMain } from './Input';
export const createInput = ({
  Root,
  Icon,
  Slot,
  Input
}) => {
  const InputField = InputGroup(Root);
  InputField.Icon = InputIcon(Icon);
  InputField.Slot = InputSlot(Slot);
  InputField.Input = InputMain(Input);
  InputField.displayName = 'InputField';
  InputField.Icon.displayName = 'InputField.Icon';
  InputField.Input.displayName = 'InputField.Input';
  InputField.Slot.displayName = 'InputField.Slot';
  return InputField;
};
//# sourceMappingURL=index.js.map