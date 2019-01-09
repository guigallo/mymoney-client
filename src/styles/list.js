const styles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    width: '86%', //
    backgroundColor: theme.palette.grey[200],
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  titleContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    alignSelf: 'flex-end',
  },
  create: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
})

export default styles;