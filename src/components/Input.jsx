import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from '../styles/input';

const Input = (props) => {
  const { property, handleChange, classes, value } = props;

  return (
    <TextField
      id={ property.id }
      label={ property.label }
      type={ property.type }
      className={ classes.textField }
      onChange={ handleChange(property.id) }
      value={ value }

      margin="normal"
      variant="outlined"

      placeholder={  property.type !== 'number' ? property.placeholder : '' }
      InputProps={{
        startAdornment: property.type === 'number' ? <InputAdornment position="start">R$</InputAdornment> : ''
      }}
    />
  )
}
export default withStyles(styles)(Input);