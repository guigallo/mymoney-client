import React from 'react';
import PropTypes from 'prop-types';
import TablePaginationActionsWrapped from './TablePagination';
import { ignoreFormProperties } from '../utils/propertyType';

import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const hasSum = (columns) => columns.find(column => column.sum === true);
const isHeaderCell = (index) => index === 0 ? true : false;
const sumColumn = (column, rows, rowsPerPage, page) => {
  let sum = 0;
  rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .forEach(row => {
      sum += row[column.id];
    });
  return sum.toFixed(2);
};

const TableFooterCustom = props => {
  const { columns, rows, totalRows, rowsPerPage, page } = props;
  const { handleChangePage, handleChangeRowsPerPage } = props;

  return (
    <TableFooter>
      {hasSum(columns) && (
        <TableRow>
          {totalRows > 0 ? (
            columns.map((column, index) => {
              if(ignoreFormProperties(column)) return null;

              if(isHeaderCell(index)) 
                return ( <TableCell key="header">Total</TableCell> )

              return column.sum ? (
                <TableCell key={column.id + column.name} align="right">{ sumColumn(column, rows, rowsPerPage, page) }</TableCell>
              ) : (
                <TableCell key={column.id + column.name} colSpan={1} />
              )
            })
          ) : (
            <TableCell colSpan={columns.length + 1} />
          )}
          <TableCell/>
        </TableRow>
      )}
      <TableRow>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          colSpan={columns.length + 1}
          count={totalRows}
          rowsPerPage={rowsPerPage}
          page={page}
          SelectProps={{
            native: true,
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActionsWrapped}
        />
      </TableRow>
    </TableFooter>
  )
}

TableFooterCustom.propTypes = {
  totalRows: PropTypes.number.isRequired,
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
  rows: PropTypes.any.isRequired,
  handleChangePage: PropTypes.func.isRequired,
  handleChangeRowsPerPage: PropTypes.func.isRequired,
}

export default TableFooterCustom;