import View from './View';
import ExpensesController from '../controllers/ExpensesController';
import { connect } from 'react-redux';
import { dispatchProps } from '../reducers/reducers';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/content'

const NAME = 'Expenses';
class ExpensesView extends View {
  constructor(props) {
    super(props);
    
    this.name = NAME;
    this.columns = [
      {name: 'Date', property: 'date',  sum: false, numeric: false  },
      {name: 'Description', property: 'description',  sum: false, numeric: false },
      {name: 'Value', property: 'value',  sum: true, numeric: true  },
      {name: 'Paid', property: 'paid',  sum: false, numeric: false },
      {name: 'Account', property: 'account',  sum: false, numeric: false },
      {name: 'Category', property: 'category',  sum: false, numeric: false }
    ];
  }
}

export default connect(...dispatchProps(NAME.toLowerCase(), ExpensesController))(withStyles(styles)(ExpensesView));