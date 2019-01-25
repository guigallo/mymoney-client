export function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

export const styles = theme => ({
  root: {
    position: 'absolute',
    //width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

export const confirmDeleteStyle = theme => ({
  buttonWrapper: {
    marginTop: '8px',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    margin: theme.spacing.unit,
  },
})