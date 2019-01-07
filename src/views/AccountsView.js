import View from './View';
import { AccountsController } from '../controllers/controllers';
import { connect } from 'react-redux';
import { dispatchProps } from '../reducers/reducers';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/content'

const NAME = 'Accounts';
class AccountsView extends View {
  constructor(props) {
    super(props);
    
    this.name = NAME;
    this.columns = [
      {name: 'Name', property: 'name',  sum: false, align: 'left' },
      {name: 'Balance', property: 'value',  sum: true, align: 'right' },
      {name: 'Final monthly balance', property: 'monthlyExpected',  sum: false, align: 'right' }
    ];
  }
}

export default connect (
  ...dispatchProps(
    NAME.toLowerCase(),
    AccountsController))(
  withStyles(styles)(AccountsView)
);