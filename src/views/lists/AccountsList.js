import List from '../../components/List';
import { AccountsController } from '../../controllers/controllers';
import { connect } from 'react-redux';
import { dispatchProps } from '../../reducers/reducers';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../styles/content'

const title = 'Accounts';
const path = '/account';
const columns = [
  { name: 'Name',                   property: 'name',             type: String, sum: false, align: 'left' },
  { name: 'Balance',                property: 'value',            type: Number, sum: true,  align: 'right' },
  { name: 'Final monthly balance',  property: 'monthlyExpected',  type: String, sum: false, align: 'right' }
];

class AccountsList extends List {
  constructor(props) {
    super(props, title, path, columns);
  }
}

export default connect (
  ...dispatchProps(
    title.toLowerCase(),
    AccountsController))(
  withStyles(styles)(AccountsList)
);