import View from './View';
import UsersController from '../controllers/UsersController';
import { connect } from 'react-redux';
import { dispatchProps } from '../reducers/reducers';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/content'

const NAME = 'Users';
class ExpensesView extends View {
  constructor(props) {
    super(props);
    
    this.name = NAME;
    this.columns = [
      {name: 'Name', property: 'name',  sum: false, numeric: false },
      {name: 'Email', property: 'email',  sum: false, numeric: false  },
      {name: 'Permissions', property: 'permFriendly',  sum: false, numeric: false }
    ];
  }
}

export default connect(...dispatchProps(NAME.toLowerCase(), UsersController))(withStyles(styles)(ExpensesView));