import View from './View';
import { TransfersController } from '../controllers/controllers';
import { connect } from 'react-redux';
import { dispatchProps } from '../reducers/reducers';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/content';

const NAME = 'Transfers';
class TransfersView extends View {
  constructor(props) {
    super(props);
    
    this.name = NAME;
    this.columns = [
      { name: 'Account Out',  property: 'accountOut', type: String, sum: false, align: 'left' },
      { name: 'Account In',   property: 'accountIn',  type: String, sum: false, align: 'left' },
      { name: 'Date',         property: 'date',       type: Date,   sum: false, align: 'left' },
      { name: 'Value',        property: 'value',      type: Number, sum: true,  align: 'right' },
    ];
  }
}

export default connect (
  ...dispatchProps(
    NAME.toLowerCase(),
    TransfersController))(
  withStyles(styles)(TransfersView)
);