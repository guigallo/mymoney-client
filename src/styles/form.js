const styles = theme => ({
  //
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

  //

  button: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },

  //

  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 3,
  },
  tableWrapper: {
    overflowX: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    //width: 400,
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
})

export default styles;