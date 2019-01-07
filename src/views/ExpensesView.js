import View from './View';
import { ExpensesController } from '../controllers/controllers';
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
      {name: 'Date', property: 'date',  sum: false, align: 'left'  },
      {name: 'Description', property: 'description',  sum: false, align: 'left' },
      {name: 'Value', property: 'value',  sum: true, align: 'right'  },
      {name: 'Paid', property: 'paid',  sum: false, align: 'left' },
      {name: 'Account', property: 'account',  sum: false, align: 'left' },
      {name: 'Category', property: 'category',  sum: false, align: 'left' }
    ];
  }
}

export default connect (
  ...dispatchProps(
    NAME.toLowerCase(),
    ExpensesController))(
  withStyles(styles)(ExpensesView)
);