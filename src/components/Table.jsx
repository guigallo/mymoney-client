import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import TableHead from './TableHead';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import { sortList } from '../utils/sortUtils';
import { styles } from '../styles/table';
import Modal from '../components/Modal';
import { getById } from '../services/api';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';

class TableCustom extends React.Component {
  constructor(props) {
   super(props); 
   this.state = {
    page: 0,
    rowsPerPage: props.rowsPerPage,
    rows: props.rows,
    order: 'asc',
    orderBy: 'none',
    modal: {
      type: '',
      open: false,
      id: '',
      obj: null,
    }
   };
   this.path = props.path;
   this.title = props.title;
   this.confirmDelete = props.confirmDelete;
   this.Notify = props.Notify;
   this.Delete = props.Delete;

   this.editLink = this.editLink.bind(this);
   this.openModal = this.openModal.bind(this);
   this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleChangePage = (event, page) => this.setState({ page });
  handleChangeRowsPerPage = event => this.setState({ rowsPerPage: parseInt(event.target.value) });
  editLink = props => <Link to={`${this.path}/${props.id}`} {...props} />;

  openModal = (type, id, cells) => {/*
  openModal = props => {/*
    const id = props.currentTarget.id;
    const row = props.currentTarget.parentElement.parentElement
    console.log( typeof row)
    for(let prop in row) {
      console.log(prop)
    }
    const type = props.currentTarget.getAttribute('modaltype');*/
    const { modal } = this.state;

    switch(type) {
      case 'info': 
        if(modal.id === id) {
          modal.open = true;
          return this.setState({ modal })
        }
    
        getById(this.path, id)
          .then(data => {
            this.setState({ modal: {
              type: 'info',
              open: true,
              //id,
              obj: data.result,
              cells: []
            }});
          })
          .catch(err => {
            this.Notify({ message: err, options: { variant: 'error' } })
          });
        break;

      case 'delete':
        this.setState({ modal: {
          type: 'delete',
          open: true,
          obj: { _id: id },
          cells
        }});
        //console.log(id)
        //console.log(type)
        //console.log(modal)
        //console.log(this.props.Delete)
        break;

      default:
        this.Notify({ message: 'Error to open modal', options: { variant: 'error' } })
    }
  }

  handleCloseModal = () => {
    const modal = this.state.modal;
    modal.open = false;
    this.setState({ modal })
  }

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
    if (this.props.rows !== nextProps.rows) return true;
    if (this.state !== nextState) return true;

    return false;
  }

  render() {
    const { classes, columns, Delete } = this.props;
    const { rowsPerPage, page, rows, order, orderBy, modal } = this.state;
    const totalRows = rows.size !== undefined ? rows.size : 0;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, totalRows - page * rowsPerPage);

    return (
      <Paper className={ classes.root }>
        <div className={ classes.tableWrapper }>
          <Modal
            title={ this.title }
            confirmDelete={ this.confirmDelete }
            type={ modal.type }
            obj={ modal.obj }
            open={ modal.open }
            cells={ modal.cells }
            Delete={ Delete }
            handleCloseModal={ this.handleCloseModal }
          />

          <Table className={classes.table}>
            <TableHead 
              columns={ columns }
              order={ order }
              orderBy={ orderBy }
              onRequestSort={ this.handleRequestSort }
            />

            <TableBody
              rows={ rows }
              rowsPerPage={ rowsPerPage }
              page={ page }
              columns={ columns }
              emptyRows={ emptyRows }

              openModal={ this.openModal }
              handleCloseModal={ this.handleCloseModal }

              editLink={ this.editLink }
            />

            <TableFooter
              columns={ columns }
              rows={ rows }
              totalRows={ totalRows }
              rowsPerPage={ rowsPerPage }
              page={ page }

              handleChangePage={ this.handleChangePage }
              handleChangeRowsPerPage={ this.handleChangeRowsPerPage }
            />
          </Table>
        </div>
      </Paper>
    );
  };
};

TableCustom.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  Delete: PropTypes.func.isRequired,
  Notify: PropTypes.func.isRequired,
};

export default withStyles(styles)(TableCustom);