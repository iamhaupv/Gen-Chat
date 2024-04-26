import FabMain from './Fab';
import FabLabel from './FabLabel';
import { FabIcon } from './FabIcon';
export function createFab({
  Root,
  Label,
  Icon
}) {
  const Fab = FabMain(Root);
  Fab.Label = FabLabel(Label);
  Fab.Icon = FabIcon(Icon);
  Fab.displayName = 'Fab';
  Fab.Icon.displayName = 'Fab.Icon';
  return Fab;
}
//# sourceMappingURL=index.js.map