import React from 'react'
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
    togleSwitch,
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
              error={ fields[property.id].error }
              key={ property.id + property.label }
              value={ fields[property.id].value }
              handleChange={ handleChange }
              togleChange={ togleSwitch }
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

export default withStyles(styles)(Form);