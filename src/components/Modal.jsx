import React from 'react';
import PropTypes from 'prop-types';
import { styles, getModalStyle} from '../styles/modal';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const ModalCustom = props => {
  const { classes, title, obj, open, handleCloseModal } = props;
  
  if (obj === null) return <></>
  
  const keys = Object.keys(obj);
  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleCloseModal}
    >
      <Paper style={getModalStyle()} className={classes.root}>
        <Typography variant="h6" id="modal-title">
          {title}
        </Typography>

        <Typography variant="caption" gutterBottom component="p">
          { `Id: ${obj._id}` }
        </Typography>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Property</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {keys.map(row => {
              if(row === '_id' || row === '__v')
               return <React.Fragment key={row}/>;

              return (
                <TableRow key={row}>
                  <TableCell component="th" align="left" scope="row">{row}</TableCell>
                  <TableCell align="right">{row !== 'paid' ? obj[row] : obj[row].toString()}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    </Modal>
  );
}

ModalCustom.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired
}

export default withStyles(styles)(ModalCustom);