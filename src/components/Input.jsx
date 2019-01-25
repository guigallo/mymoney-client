import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/input';
import { ignoreListProperties } from '../utils/propertyType';

import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import InputAdornment from '@material-ui/core/InputAdornment';
import withStyles from '@material-ui/core/styles/withStyles';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const Input = (props) => {
  if(ignoreListProperties(props.property)) return null;
  const { property, error, handleChange, classes, value, propRelation } = props;

  var fieldProps = {};
  switch (property.type) {
    case String: fieldProps = { type: 'text', placeholder: property.label }; break;
    case Number: fieldProps = { type: 'number', placeholder: property.label }; break;
    case Date: fieldProps = { type: 'date', placeholder: property.label }; break;
    case Boolean: break;
    case 'Money': fieldProps = { type: 'number', placeholder: property.label, startAdornment: (<InputAdornment position="start">R$</InputAdornment>) }; break;
    case 'password': fieldProps = { type: 'password', placeholder: property.label }; break;
    case 'email': fieldProps = { type: 'email', placeholder: property.label }; break;
    case 'Select': fieldProps = {}; break;
    default: console.log(`ERR: invalid type: ${property.type}`);
  }

  let Field;
  switch (property.type) {
    case Boolean:
      Field = (
        <FormControlLabel
          label={ property.label }
          control={
            <Switch
              id={ property.id }
              checked={ value }
              onChange={ handleChange(property.id, property) }
              value={ value }
              className={ classes.input }
              color="primary"
            />
          }
        />
      );
      break;

    case 'Select':
      let relations = undefined
      if(propRelation !== undefined)
        relations = propRelation[0];
      
      Field = (
        <FormControl variant="outlined" className={classes.input } error={ error } >
          <InputLabel /*ref={ labelRef }*/ htmlFor={ property.id } >
            { property.label }
          </InputLabel>
          <Select
            value={ value }
            onChange={ handleChange(property.id) }
            input={
              <OutlinedInput labelWidth={100} /* use ref to labelWidth */ id={ property.id } />
            }
          >
            {relations !== undefined && relations.map(prop =>
              <MenuItem key={prop._id} value={prop._id}>{prop.name}</MenuItem>
            )}
          </Select>
        </FormControl>
      );
      break;

    default:
      const val = property.type === Date && value !== undefined ? value.substr(0, 10) : value;
      Field = (
        <TextField
          id={ property.id }
          label={ property.type !== Date ? property.label : '' }
          className={ classes.input }
          onChange={ handleChange(property.id) }
          value={ val }
          variant="outlined"
          InputProps={ fieldProps }
          error={ error }
        >
        </TextField>
      );
  }

  return Field;
}

Input.propTypes = {
  classes: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired,
  value: PropTypes.any.isRequired,
  handleChange: PropTypes.func.isRequired,
  property: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.any.isRequired,
    sum: PropTypes.bool.isRequired,
    align: PropTypes.oneOf(['left', 'right']).isRequired,
    required: PropTypes.bool.isRequired,
    show: PropTypes.string.isRequired,
  }).isRequired,
  propRelation: PropTypes.array.isRequired,
}

export default withStyles(styles)(Input);