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
      { name: 'Name',         property: 'name',       type: String, sum: false, align: 'left' },
      { name: 'Limit',        property: 'limit',      type: Number, sum: true,  align: 'right' },
      { name: 'Closing day',  property: 'closingDay', type: String, sum: false, align: 'right' },
      { name: 'Due date',     property: 'dueDate',    type: String, sum: false, align: 'right' },
      { name: 'Account',      property: 'account',    type: String, sum: false, align: 'left' }
    ];
  }
}

export default connect (
  ...dispatchProps(
    'creditcards',
    CreditcardsController))(
  withStyles(styles)(CreditcardsView)
);