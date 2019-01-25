import React from 'react';
import { connect } from "react-redux";
import TableInfo from './TableInfo';
import { confirmDeleteStyle} from '../styles/modal';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { bindActionCreators } from 'redux'
import { deleteRoute } from '../actions/crud.actions'

const deleteFunction = (props) => {
  console.log(props)
}
const deleteObj = connect(null, mapDispatchToProps)(deleteFunction)

const ConfirmDelete = props => {
  const { classes, id, confirmDelete, cells, handleCloseModal, Delete } = props;

  let obj = {};
  confirmDelete.forEach(prop => obj[prop] = cells.namedItem(prop).innerText);

  const deleteClick = () => {
    deleteRoute(id)
  }
  console.log(this)

  return (
    <>
      <TableInfo
        keys={ confirmDelete }
        obj={ obj }
      />

      <div className={ classes.buttonWrapper }>
        <Button type='submit' variant="contained" color="primary" className={ classes.button } onClick={ deleteObj }>
          Delete
        </Button>

        <Button variant="outlined" color="secondary" className={ classes.button } onClick={ handleCloseModal }>
          Cancel
        </Button>
      </div>
    </>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    ...bindActionCreators({ deleteRoute }, dispatch)
  }
}
//export default withStyles(confirmDeleteStyle)(ConfirmDelete);
export default connect(null, mapDispatchToProps)(ConfirmDelete);