import List from '../../components/List';
import { TransfersController } from '../../controllers/controllers';
import { connect } from 'react-redux';
import { dispatchProps } from '../../reducers/reducers';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../styles/content';

const title = 'Transfers';
const columns = [
  { name: 'Account Out',  property: 'accountOut', type: String, sum: false, align: 'left' },
  { name: 'Account In',   property: 'accountIn',  type: String, sum: false, align: 'left' },
  { name: 'Date',         property: 'date',       type: Date,   sum: false, align: 'left' },
  { name: 'Value',        property: 'value',      type: Number, sum: true,  align: 'right' },
];

class TransfersList extends List {
  constructor(props) {
    super(props, title, columns);
  }
}

export default connect (
  ...dispatchProps(
    title.toLowerCase(),
    TransfersController))(
  withStyles(styles)(TransfersList)
);