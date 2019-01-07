import View from './View';
import { UsersController } from '../controllers/controllers';
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
      { name: 'Name',         property: 'name',         type: String, sum: false, align: 'left' },
      { name: 'Email',        property: 'email',        type: String, sum: false, align: 'left' },
      { name: 'Permissions',  property: 'permFriendly', type: String, sum: false, align: 'left' }
    ];
  }
}

export default connect (
  ...dispatchProps(
    NAME.toLowerCase(),
    UsersController))(
  withStyles(styles)(ExpensesView)
);