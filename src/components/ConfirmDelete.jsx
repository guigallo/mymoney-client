import React from 'react';
import { withReducer } from 'recompose';
import TableInfo from './TableInfo';
import { confirmDeleteStyle} from '../styles/modal';
import TestCompose from './TestCompose';
import { reducer } from '../reducers/crud.reducers';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ConfirmDelete = props => {
  const { classes, id, confirmDelete, cells, handleCloseModal, Delete } = props;

  let obj = {};
  confirmDelete.forEach(prop => obj[prop] = cells.namedItem(prop).innerText);


  let state = {
    route: 'incomes',
    id
  }
  const enhance = withReducer('state', 'dispatch', reducer, state)
  const DeleteButton = enhance(({ state, dispatch }) =>
    <Button type='submit' variant="contained" color="primary" className={ classes.button } onClick={ dispatch({type: 'DELETE_INCOMES'}) }>
      Delete
    </Button>
  )

  const deleteClick = () => {
    //console.log(Delete(id));
  }

  return (
    <>
      <TableInfo
        keys={ confirmDelete }
        obj={ obj }
      />

      <div className={ classes.buttonWrapper }>
        <Button type='submit' variant="contained" color="primary" className={ classes.button } onClick={ deleteClick }>
          Delete
        </Button>

        <DeleteButton/>

        <Button variant="outlined" color="secondary" className={ classes.button } onClick={ handleCloseModal }>
          Cancel
        </Button>
      </div>
    </>
  )
}

export default withStyles(confirmDeleteStyle)(ConfirmDelete);