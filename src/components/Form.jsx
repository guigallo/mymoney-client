import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Input from '../components/Input';
import { show } from '../utils/propertyType';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/form';
import FormController from '../controllers/FormController';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: props.fields,
      saved: false,
    }
    this.title = props.title;
    this.actionForm = props.actionForm;
    this.formType = props.formType;
    this.properties = props.properties;
    this.path = props.path;
    this.relationsData = props.relationsData;
    this.createNotify = props.createNotify;

    this.constroller = new FormController();

    this.handleChange = this.handleChange.bind(this);
    this.propRelation = this.propRelation.bind(this);
    this.sendForm = this.sendForm.bind(this);
  };

  //binded
  handleChange = (name, property = '') => event => {
    let value = event.target.value;
    
    // Convert to bool if is checkbox
    if(property.hasOwnProperty('type')) {
      const actual = event.target.value;
      if (actual === '') value = true;
      else value = actual === 'true' ? false : true;
    }

    let fields = this.state.fields;
    fields[name].value = value;
    this.setState({ fields });
  }

  clearForm = () => {
    const fields = this.state.fields;
    for(let prop in fields) {
      fields[prop].value = '';
      fields[prop].error = false;
    }
    this.setState({ fields });
  }

  cancelLink = props => <Link to={`${this.path}`} {...props} />

  propRelation(id) {
    const datas = this.relationsData;
    if(datas !== undefined) {
      let stores = [];
      datas.forEach(data => {
        if(id === 'account' && data.hasOwnProperty('accounts'))
          stores.push(data.accounts);

        if(id === 'category' && data.hasOwnProperty('categories'))
          stores.push(data.categories);

        if((id === 'accountIn' || id === 'accountOut') && data.hasOwnProperty('accounts'))
          stores.push(data.accounts);
      });
      return stores;
    }
  }

  validateForm = () => {
    const { fields } = this.state;
    let formHasError = false;

    for(let data in fields) {
      const prop = fields[data];
      if(prop.required && prop.value === '') {
        prop.error = 'Required';
        formHasError = true;
        this.createNotify(`${data} is required`, 'error')
      }
    }
    if(formHasError) {
      this.setState({ fields, formHasError });
      return false;
    } else {
      return true;
    } 
  }

  clearErrors = () => {
    const { fields } = this.state;
    const formHasError = false;

    for(let data in fields) {
      if(fields[data].hasOwnProperty(data))
        fields[data].error = false;
    }
    this.setState({ fields, formHasError })
  }

  sendForm = event => {
    event.preventDefault();
    this.clearErrors();
    if(! this.validateForm()) return;

    const { fields } = this.state;
    const { properties, path } = this;

    let body = {}
    properties.forEach(prop => {
      if(prop.show === show.all || prop.show === show.form)
        body[prop.id] = fields[prop.id].value;
    });

    const route = path;
    this.actionForm(route, body)
      .then(response => {
        if(response.errors) {
          response.errors.forEach(error => {
            fields[error.param].error = error.msg;
            this.createNotify(error.msg, 'error');
          });
          return this.setState({ fields })
        }
        
        this.setState({ saved: true });
        this.createNotify(`${response.result.name} saved`, 'success');
      })
      .catch(fail => {
        this.createNotify(fail, 'error');
        console.log(fail);
      });
  }

  render = () => {
    if(this.state.saved === true)
      return <Redirect to={ this.path } />

    const { fields } = this.state;
    const { properties, formType, title } = this;
    const { classes } = this.props;
    
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
          <form className={classes.tableWrapper} onSubmit={this.sendForm} method="post">
            {properties.map(property => (
              <Input
                error={ fields[property.id].error }
                key={ property.id + property.label }
                value={ fields[property.id].value }
                handleChange={ this.handleChange }
                togleChange={ this.togleSwitch }
                property={ property }
                propRelation={ property.type === 'Select' ? this.propRelation(property.id) : [] }
              />
            ))}

            <div className={ classes.buttonWrapper }>
              <Button type='submit' variant="contained" color="primary" className={ classes.button }>
                Save
              </Button>

              {formType !== 'Edit' && (
                <Button variant="outlined" className={ classes.button } onClick={ this.clearForm }>
                  Clear
                </Button>
              )}

              <Button variant="outlined" color="secondary" className={ classes.button } component={ this.cancelLink }>
                Cancel
              </Button>
            </div>
          </form>
        </Paper>
      </main>
    )
  };
}

export default withStyles(styles)(Form);