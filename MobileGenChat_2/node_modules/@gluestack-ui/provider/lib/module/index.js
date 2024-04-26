import { Provider as MainProvider } from './Provider';
export const createProvider = ({
  StyledProvider
}) => {
  const GluestackUIStyledProvider = MainProvider({
    StyledProvider
  });
  GluestackUIStyledProvider.displayName = 'GluestackUIStyledProvider';
  return GluestackUIStyledProvider;
};
//# sourceMappingURL=index.js.map