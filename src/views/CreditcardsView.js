import View from './View';
import CreditcardsController from '../controllers/CreditcardsController';
import { connect } from 'react-redux';
import { dispatchProps } from '../reducers/reducers';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/content'

class CreditcardsView extends View {
  constructor(props) {
    super(props);
    
    this.name = 'Credit Cards';
    this.columns = [
      {name: 'Name', property: 'name',  sum: false, numeric: false },
      {name: 'Limit', property: 'limit',  sum: true, numeric: true  },
      {name: 'Closing day', property: 'closingDay',  sum: false, numeric: true },
      {name: 'Due date', property: 'dueDate',  sum: false, numeric: true },
      {name: 'Account', property: 'account',  sum: false, numeric: false }
    ];
  }
}

export default connect(...dispatchProps('creditcards', CreditcardsController))(withStyles(styles)(CreditcardsView));