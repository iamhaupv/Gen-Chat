import { default as PressableMain } from './Pressable';
export function createPressable({
  Root
}) {
  const Pressable = PressableMain(Root);
  Pressable.displayName = 'Pressable';
  return Pressable;
}
//# sourceMappingURL=index.js.map