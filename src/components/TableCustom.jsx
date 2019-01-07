import React from 'react';
import PropTypes from 'prop-types';
import { sortList } from '../utils/sortUtils';
import TableHead from './TableHead';
import TablePaginationActionsWrapped from './TablePagination';
import DateUtils from '../utils/DateUtils';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { styles } from '../styles/table';
import LensIcons from '@material-ui/icons/Lens';

class TableCustom extends React.Component {
  constructor(props) {
   super(props); 
   this.state = {
     page: 0,
     rowsPerPage: props.rowsPerPage,
     rows: props.rows,
     order: 'asc',
     orderBy: 'none',
   };
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleRequestSort = (event, property) => {
    let newOrder;
    let newOrderBy;
    if(this.state.orderBy === property) {
      newOrder = this.state.order === 'asc' ? 'desc' : 'asc';
      newOrderBy = this.state.orderBy
    } else {
      newOrder = 'desc';
      newOrderBy = property;
    }

    this.setState({
      rows: sortList(this.props.rows, newOrder, newOrderBy),
      order: newOrder,
      orderBy: newOrderBy,
    });
  };

  render() {
    const { classes, columns } = this.props;
    const { rowsPerPage, page, rows, order, orderBy } = this.state;
    const totalRows = ! Object.keys(rows).length === 0 && rows.constructor === Object ? rows.size : 0;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, totalRows - page * rowsPerPage);

    return (
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead 
              columns={ columns }
              order={ order }
              orderBy={ orderBy }
              onRequestSort={ this.handleRequestSort }
            />

            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
                <TableRow key={ row.hasOwnProperty('_id') ? row._id : row.id }>
                  {columns.map((column, index) => {
                    let display = ''
                    switch(column.type) {
                      case String:
                        display = row[column.property];
                        break;

                      case Number:
                        display = row[column.property].toFixed(2);
                        break;

                      case Date:
                        display = DateUtils.toStringDate(new Date(row[column.property]), 'pt-br');
                        break;

                      case Boolean:
                        display = (<LensIcons className={ row[column.property] ? classes.paid : classes.unpaid } />)
                        break;

                      default:
                        display = 'invalid type';
                        break;
                    }

                    return (<TableCell key={ column.property } align={ column.align } >{ display }</TableCell>)
                  })}
                </TableRow> 
                
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                {totalRows > 0 ? (
                  columns.map((column, index) => {
                    if(isHeaderCell(index)) 
                      return ( <TableCell key="header">Total</TableCell> )

                    return column.sum ? (
                      <TableCell key={column.name} align="right">{ sumColumn(column, rows) }</TableCell>
                    ) : (
                      <TableCell key={column.name} colSpan={1} />
                    )
                  })
                ) : (
                  <TableCell colSpan={6} />
                )}
              </TableRow>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={columns.length}
                  count={totalRows}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    native: true,
                  }}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActionsWrapped}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </Paper>
    );
  };
};

function isHeaderCell(index) {
  return index === 0 ? true : false;
};

function sumColumn(column, rows) {
  return rows.reduce((prev, current) => {
    return current[column.property] !== undefined ? 
      prev[column.property] + current[column.property] :
      prev[column.property];
  });
};

TableCustom.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

export default withStyles(styles)(TableCustom);