import React from 'react';
import PropTypes from 'prop-types';
import { SnackbarProvider, withSnackbar } from 'notistack';

class SnackbarCustomClass extends React.Component {
  constructor(props) {
    super(props);
    const { snacks } = props;
    this.state = { snacks };

    this.handleOpen = this.handleOpen.bind(this);

    this.state.snacks.map(snack => {
      return this.handleOpen(snack.message, snack.variant)
    });
  }

  handleOpen = (message, variant) =>
    this.props.enqueueSnackbar(message, { variant })

  render = () => <></>
}
SnackbarCustomClass.propTypes = {
  enqueueSnackbar: PropTypes.func.isRequired,
};
const SnackbarCustom = withSnackbar(SnackbarCustomClass);

const SnackbarNotistack = (props) => (
  <SnackbarProvider
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
  >
    <SnackbarCustom {...props} />
  </SnackbarProvider>
);
export default SnackbarNotistack;
