import View from './View';
import { CategoriesController } from '../controllers/controllers';
import { connect } from 'react-redux';
import { dispatchProps } from '../reducers/reducers';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/content';

const title = 'Categories';
const columns = [
  { name: 'Name',  property: 'name', type: String, sum: false, align: 'left' },
];

class CategoriesView extends View {
  constructor(props) {
    super(props, title, columns);
  }
}

export default connect (
  ...dispatchProps(
    title.toLowerCase(),
    CategoriesController))(
  withStyles(styles)(CategoriesView)
);