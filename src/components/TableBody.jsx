import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { bodyStyles } from '../styles/table';
import DateUtils from '../utils/DateUtils';
import { ignoreFormProperties } from '../utils/propertyType';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import LensIcons from '@material-ui/icons/Lens';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';

const TableBodyCustom = props => {
  const { classes, rows, rowsPerPage, page, columns, emptyRows } = props;
  const { openModal, editLink } = props;
  let typeAction = undefined;

  const clickRow = e => {
    if(typeAction === undefined) return;
    let cells = [];
    if(typeAction === 'delete') cells = e.currentTarget.cells;

    openModal(typeAction, e.currentTarget.id, cells);
    typeAction = undefined;
  }
  
  const typeButton = e => typeAction = e.currentTarget.getAttribute('modaltype');

  return (
    <TableBody>
      {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
        <TableRow
          id={row.hasOwnProperty('_id') ? row._id : row.id /**Change api to return only _id */ }
          key={row.hasOwnProperty('_id') ? row._id : row.id /**Change api to return only _id */ }
          onClick={clickRow}
        >
          {columns.map(column => {
            let display = ''
            switch(column.type) {
              case String:
              case 'email':
              case 'Select':
                display = row[column.id];
                break;

              case Number:
                display = row[column.id] !== undefined ? row[column.id].toFixed(2) : row[column.id];
                break;

              case Date:
                display = DateUtils.toStringDate(new Date(row[column.id]), 'pt-br');
                break;

              case Boolean:
                display = (<LensIcons className={ row[column.id] ? classes.paid : classes.unpaid } />)
                break;

              case 'Money':
                display = row[column.id] !== undefined ? `R$ ${row[column.id].toFixed(2)}` : row[column.id];
                break;
          
              case 'password':
                display = '';
                break;

              default:
                display = column.type(row[column.id]);
                break;
            }

            return ignoreFormProperties(column) ? null : (
              <TableCell id={ column.id } key={ column.id + column.label } align={ column.align } >{ display }</TableCell>
            )
          })}

          <TableCell align="right">
            <IconButton /*id={row._id}*/ aria-label="Info" modaltype="info" /*onClick={openModal}*/ onClick={typeButton}>
              <InfoIcon />
            </IconButton>
            <IconButton id={row._id} aria-label="Edit" component={editLink} >
              <EditIcon />
            </IconButton>
            <IconButton /*id={row._id}*/ aria-label="Delete" modaltype="delete" /*onClick={openModal}*/onClick={typeButton}>
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow> 
        
      ))}

      {emptyRows > 0 && (
        <TableRow style={{ height: 48 * emptyRows }}>
          <TableCell colSpan={7} />
        </TableRow>
      )}
    </TableBody>
  );
}

TableBodyCustom.propTypes = {
  classes: PropTypes.object.isRequired,
  rows: PropTypes.any.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  columns: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.any.isRequired,
    sum: PropTypes.bool.isRequired,
    align: PropTypes.oneOf(['left', 'right']).isRequired,
    required: PropTypes.bool.isRequired,
    show: PropTypes.string.isRequired,
  })).isRequired,
  emptyRows: PropTypes.number.isRequired,
  openModal: PropTypes.func.isRequired,
  editLink: PropTypes.func.isRequired,
}

export default withStyles(bodyStyles)(TableBodyCustom);