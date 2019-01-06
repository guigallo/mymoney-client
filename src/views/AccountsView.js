import View from './View';
import AccountsController from '../controllers/AccountsController';
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
      {name: 'Name', property: 'name',  sum: false, numeric: false },
      {name: 'Balance', property: 'value',  sum: true, numeric: true  },
      {name: 'Final monthly balance', property: 'monthlyExpected',  sum: false, numeric: true }
    ];
  }
}

export default connect(...dispatchProps(NAME.toLowerCase(), AccountsController))(withStyles(styles)(AccountsView));