import View from './View';
import { CategoriesController } from '../controllers/controllers';
import { connect } from 'react-redux';
import { dispatchProps } from '../reducers/reducers';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/content';

const NAME = 'Categories';
class CategoriesView extends View {
  constructor(props) {
    super(props);
    
    this.name = NAME;
    this.columns = [
      { name: 'Name',  property: 'name', type: String, sum: false, align: 'left' },
    ];
  }
}

export default connect (
  ...dispatchProps(
    NAME.toLowerCase(),
    CategoriesController))(
  withStyles(styles)(CategoriesView)
);