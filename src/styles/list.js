import { appBarSpacer, content } from './mixins/main';

const styles = theme => ({
  ...appBarSpacer(theme),
  ...content(theme),
  
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