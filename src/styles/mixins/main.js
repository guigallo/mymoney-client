import { spaceIndex } from './variables';

export const root = (theme, extra) => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * spaceIndex,
    ...extra
  }
});

export const appBarSpacer = theme => ({
  appBarSpacer: theme.mixins.toolbar
})

export const content = theme => ({
  content: {
    width: '86%', //
    backgroundColor: theme.palette.grey[200],
    flexGrow: 1,
    padding: theme.spacing.unit * spaceIndex,
    height: '100vh',
    overflow: 'auto',
  }
})