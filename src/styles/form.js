import { root, appBarSpacer, content } from './mixins/main';
import { spaceIndex } from './mixins/variables';

const styles = theme => ({
  ...root(theme, { padding: theme.spacing.unit * spaceIndex }),
  ...appBarSpacer(theme),
  ...content(theme),
  
  tableWrapper: {
    overflowX: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  buttonWrapper: {
    marginTop: '8px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    margin: theme.spacing.unit,
  },
});

export default styles;