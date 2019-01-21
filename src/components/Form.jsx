import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Input from '../components/Input';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/form';

const Form = props => {
  const {
    classes,
    formType,
    title,
    path,
    fields,
    properties,
    sendForm,
    handleChange,
    propRelation,
    clearForm,
  } = props;

  const cancelLink = props => <Link to={`${path}`} {...props} />
  
  return (
    <main className={ classes.content }>
      <div className={ classes.appBarSpacer } />

      <Typography variant="h4" gutterBottom component="h2">
        { `${formType} ${title}` }
      </Typography>

      <Typography variant="caption" gutterBottom component="p">
        { fields._id !== undefined ? `Id: ${fields._id}` : '' }
      </Typography>

      <Paper className={classes.root}>
        <form className={classes.tableWrapper} onSubmit={ sendForm } method="post">
          {properties.map(property => (
            <Input
              error={ fields[property.id].error.hasError }
              key={ property.id + property.label }
              value={ fields[property.id].value }
              handleChange={ handleChange }
              property={ property }
              propRelation={ property.type === 'Select' ? propRelation(property.id) : [] }
            />
          ))}

          <div className={ classes.buttonWrapper }>
            <Button type='submit' variant="contained" color="primary" className={ classes.button }>
              Save
            </Button>

            {formType !== 'Edit' && (
              <Button variant="outlined" className={ classes.button } onClick={ clearForm }>
                Clear
              </Button>
            )}

            <Button variant="outlined" color="secondary" className={ classes.button } component={ cancelLink }>
              Cancel
            </Button>
          </div>
        </form>
      </Paper>
    </main>
  )
};

Form.propTypes = {
  classes: PropTypes.object.isRequired,
  formType: PropTypes.oneOf(['Create', 'Edit']).isRequired,
  title: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  fields: PropTypes.object.isRequired,
  properties: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.any.isRequired,
    sum: PropTypes.bool.isRequired,
    align: PropTypes.oneOf(['left', 'right']).isRequired,
    required: PropTypes.bool.isRequired,
    show: PropTypes.string.isRequired,
  })).isRequired,
  sendForm: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  propRelation: PropTypes.func.isRequired,
  clearForm: PropTypes.func.isRequired,
}

export default withStyles(styles)(Form);