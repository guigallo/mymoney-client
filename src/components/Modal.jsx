import React from 'react';
import PropTypes from 'prop-types';
import { styles, getModalStyle} from '../styles/modal';
import ConfirmDelete from './ConfirmDelete';
import TableInfo from './TableInfo';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';

const ModalCustom = props => {
  const { classes, title, obj, open, type, handleCloseModal, confirmDelete, cells, Delete } = props;
  
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

        {type === 'info' && (<TableInfo keys={ keys } obj={ obj }/>)}
        {type === 'delete' && (
          <ConfirmDelete
            id={ obj._id }
            confirmDelete={ confirmDelete }
            cells={ cells }
            handleCloseModal={ handleCloseModal }
            Delete={ Delete }
          />
        )}

        <></>
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