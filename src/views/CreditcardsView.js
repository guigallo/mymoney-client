import View from './View';
import { CreditcardsController } from '../controllers/controllers';
import { connect } from 'react-redux';
import { dispatchProps } from '../reducers/reducers';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/content'

class CreditcardsView extends View {
  constructor(props) {
    super(props);
    
    this.name = 'Credit Cards';
    this.columns = [
      {name: 'Name', property: 'name',  sum: false, align: 'left' },
      {name: 'Limit', property: 'limit',  sum: true, align: 'right'  },
      {name: 'Closing day', property: 'closingDay',  sum: false, align: 'right' },
      {name: 'Due date', property: 'dueDate',  sum: false, align: 'right' },
      {name: 'Account', property: 'account',  sum: false, align: 'left' }
    ];
  }
}

export default connect (
  ...dispatchProps(
    'creditcards',
    CreditcardsController))(
  withStyles(styles)(CreditcardsView)
);