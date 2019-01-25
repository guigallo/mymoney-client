import React from 'react';
import TableInfo from './TableInfo';
import { confirmDeleteStyle} from '../styles/modal';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const ConfirmDelete = props => {
  const { classes, id, confirmDelete, cells, handleCloseModal, cbDelete } = props;

  let obj = {};
  confirmDelete.forEach(prop => obj[prop] = cells.namedItem(prop).innerText);

  return (
    <>
      <TableInfo
        keys={ confirmDelete }
        obj={ obj }
      />

      <div className={ classes.buttonWrapper }>
        <Button type='submit' variant="contained" color="primary" className={ classes.button } onClick={ () => cbDelete(id) }>
          Delete
        </Button>

        <Button variant="outlined" color="secondary" className={ classes.button } onClick={ handleCloseModal }>
          Cancel
        </Button>
      </div>
    </>
  )
}

export default withStyles(confirmDeleteStyle)(ConfirmDelete);