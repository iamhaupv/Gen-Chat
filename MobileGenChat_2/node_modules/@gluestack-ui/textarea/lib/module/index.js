import { Textarea } from './Textarea';
import { TextareaRoot } from './TextareaRoot';
//TODO: deprecate later
/**
 * @deprecated The method should not be used, use createTextarea instead
 */
export function createTextArea({
  Root,
  Input
}) {
  const TextareaTemp = TextareaRoot(Root);
  TextareaTemp.Input = Textarea(Input);
  TextareaTemp.displayName = 'Textarea';
  TextareaTemp.Input.displayName = 'Textarea.Input';
  return TextareaTemp;
}
export function createTextarea({
  Root,
  Input
}) {
  const TextareaTemp = TextareaRoot(Root);
  TextareaTemp.Input = Textarea(Input);
  TextareaTemp.displayName = 'Textarea';
  TextareaTemp.Input.displayName = 'Textarea.Input';
  return TextareaTemp;
}
//# sourceMappingURL=index.js.map