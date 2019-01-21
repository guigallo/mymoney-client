import { root } from './mixins/main';
import { green, red } from "@material-ui/core/colors";

export const styles = theme => ({
  ...root(theme),

  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  paid: {
    color: green[500],
  },
  unpaid: {
    color: red[500],
  }
});

export const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});