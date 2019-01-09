import Form from '../../components/Form';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../styles/form';

const title = 'Account';
const properties = [
  { id: 'name',     label: 'Name',    placeholder: 'Name',    type: 'text', },
  { id: 'balance',  label: 'Balance', placeholder: 'Balance', type: 'number', },
];

class AccountsList extends Form {
  constructor(props) {
    super(props, title, properties);
  }
}

export default withStyles(styles)(AccountsList);