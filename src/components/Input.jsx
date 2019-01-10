import React from 'react';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import InputAdornment from '@material-ui/core/InputAdornment';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from '../styles/input';
import { ignoreListProperties } from '../utils/propertyType';

const Input = (props) => {
  if(ignoreListProperties(props.property)) return null;
  const { property, handleChange, classes, value } = props;

  var fieldProps = '';
  switch (property.type) {
    case String:
      fieldProps = {
        type: 'text',
        placeholder: property.label,
      };
      break;

    case Number:
      fieldProps = {
        type: 'number',
        placeholder: property.label,
      };
      break;

    case Date:
      fieldProps = {
        type: 'date',
        placeholder: property.label,
      };
      break;

    case Boolean: break;

    case 'Money':
      fieldProps = {
        type: 'number',
        placeholder: property.label,
        startAdornment: (<InputAdornment position="start">R$</InputAdornment>),
      };
      break;

    case 'password':
      fieldProps = {
        type: 'password',
        placeholder: property.label,
      };
      break;

    case 'email':
      fieldProps = {
        type: 'email',
        placeholder: property.label,
      };
      break;

    default:
      console.log(typeof property.type);
  }

  return property.type !== Boolean ? (
    <TextField
      id={ property.id }
      label={ property.type !== Date ? property.label : '' }
      className={ classes.textField }
      onChange={ handleChange(property.id) }
      value={ value }
      
      margin="normal"
      variant="outlined"
      
      InputProps={ fieldProps }
    >
    </TextField>
  ) : (
    <FormControlLabel
      control={
        <Switch
          id={ property.id }
          checked={ value }
          onChange={ handleChange(property.id, property) }
          value={ value }
          className={ classes.textField }
          color="primary"
        />
      }
      label={ property.label }
    />
  )
}
export default withStyles(styles)(Input);