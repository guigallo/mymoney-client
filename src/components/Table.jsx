import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TableHead from './TableHead';
import TablePaginationActionsWrapped from './TablePagination';
import DateUtils from '../utils/DateUtils';
import { sortList } from '../utils/sortUtils';
import { ignoreFormProperties } from '../utils/propertyType';
import { styles } from '../styles/table';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LensIcons from '@material-ui/icons/Lens';

import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import DeleteIcon from '@material-ui/icons/Delete';

class TableCustom extends React.Component {
  constructor(props) {
   super(props); 
   this.state = {
     page: 0,
     rowsPerPage: props.rowsPerPage,
     rows: props.rows,
     order: 'asc',
     orderBy: 'none',
     path: props.path
   };
  }

  handleChangePage = (event, page) => { this.setState({ page }) };
  handleChangeRowsPerPage = event => { this.setState({ rowsPerPage: event.target.value }) };
  editLink = props => <Link to={`${this.state.path}/${props.id}`} {...props} />;

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

  
  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.rows !== nextProps.rows)
      return true;

    if (this.state !== nextState)
      return true;

    return false;
  }

  render() {
    const { classes, columns } = this.props;
    const { rowsPerPage, page, rows, order, orderBy } = this.state;
    const totalRows = rows.size !== undefined ? rows.size : 0;
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
                      <TableCell key={ column.id + column.label } align={ column.align } >{ display }</TableCell>
                    )
                  })}

                  <TableCell align="right">
                    <IconButton id={row._id} className={classes.button} aria-label="Info">
                      <InfoIcon />
                    </IconButton>
                    <IconButton id={row._id} className={classes.button} aria-label="Edit" component={this.editLink.bind(this)} >
                      <EditIcon />
                    </IconButton>
                    <IconButton id={row._id} className={classes.button} aria-label="Delete">
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

            <TableFooter>
              {hasSum(columns) && (
                <TableRow>
                  {totalRows > 0 ? (
                    columns.map((column, index) => {
                      if(ignoreFormProperties(column)) return null;

                      if(isHeaderCell(index)) 
                        return ( <TableCell key="header">Total</TableCell> )

                      return column.sum ? (
                        <TableCell key={column.id + column.name} align="right">{ sumColumn(column, rows) }</TableCell>
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

const hasSum = (columns) => columns.find(column => column.sum === true);
const isHeaderCell = (index) => index === 0 ? true : false;

const sumColumn = (column, rows) => {
  let sum = 0;
  rows.forEach(row => {
    sum += row[column.id];
  });
  return sum.toFixed(2);
};

TableCustom.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number.isRequired
};

export default withStyles(styles)(TableCustom);