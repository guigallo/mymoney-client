import List from '../../components/List';
import { IncomesController } from '../../controllers/controllers';
import { connect } from 'react-redux';
import { dispatchProps } from '../../reducers/reducers';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../styles/content';

const title = 'Incomes';
const path = '/income';
const columns = [
  { name: 'Paid',        property: 'paid',        type: Boolean,  sum: false, align: 'left' },
  { name: 'Date',        property: 'date',        type: Date,     sum: false, align: 'left' },
  { name: 'Description', property: 'description', type: String,   sum: false, align: 'left' },
  { name: 'Account',     property: 'account',     type: String,   sum: false, align: 'left' },
  { name: 'Category',    property: 'category',    type: String,   sum: false, align: 'left' },
  { name: 'Value',       property: 'value',       type: Number,   sum: true,  align: 'right' },
];

class IncomesList extends List {
  constructor(props) {
    super(props, title, path, columns);
  }
}

export default connect (
  ...dispatchProps(
    title.toLowerCase(),
    IncomesController))(
  withStyles(styles)(IncomesList)
);