import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Input from '../components/Input';
import { post } from '../services/api';
import { show } from '../utils/propertyType';

class Form extends React.Component {
  constructor(middleware) {
    super(middleware.props);
    this.state = {
      classes: middleware.props.classes,
      model: middleware.model,
      formHasError: false,
      created: false,
      ...this.propertiesToState(middleware.model.properties),
    };

    this.handleChange = this.handleChange.bind(this);
    this.propRelation = this.propRelation.bind(this);
    this.sendForm = this.sendForm.bind(this);
  };
  
  propertiesToState(properties) {
    let formData = {};
    properties.forEach(property => {
      formData[property.id] = {
        value: '',
        required: property.required,
        error: false,
      };
    });
    return { formData };
  }

  handleChange = (name, property = '') => event => {
    let value = event.target.value;
    if(property.hasOwnProperty('type')) {
      const actual = event.target.value;
      if (actual === '')
        value = true;
      else
        value = actual === 'true' ? false : true;
    }
    let formData = this.state.formData;
    formData[name].value = value;
    this.setState({ formData });
  }

  clearForm = () => {
    const formData = this.state.formData;
    for(let prop in formData) {
      formData[prop].value = '';
      formData[prop].error = false;
    }
    this.setState({ formData });
  }

  cancelLink = props => <Link to={`${this.state.model.path}`} {...props} />
  componentDidMount = () => this.props.Relations(this.props.relations);

  propRelation(id) {
    const datas = this.props.relationsData;
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

  createNotify = (message, variant) => 
    this.props.Notify({ message, options: { variant } });

  validateForm = () => {
    const { formData } = this.state;
    let formHasError = false;

    for(let data in formData) {
      const prop = formData[data];
      if(prop.required && prop.value === '') {
        prop.error = 'Required';
        formHasError = true;
        this.createNotify(`${data} is required`, 'error')
      }
    }
    if(formHasError) {
      this.setState({ formData, formHasError });
      return false;
    } else {
      return true;
    } 
  }

  sendForm = event => {
    event.preventDefault();
    if(! this.validateForm()) return;

    const { formData } = this.state;
    const { properties } = this.state.model;

    let body = {}
    properties.forEach(prop => {
      if(prop.show === show.all || prop.show === show.form)
        body[prop.id] = formData[prop.id].value;
    });

    const route = this.state.model.path;
    post(route, body)
      .then(response => {
        if(response.errors) {
          response.errors.forEach(error => {
            formData[error.param].error = error.msg;
            this.createNotify(error.msg, 'error');
          });
          return this.setState({ formData })
        }
        
        this.setState({ created: true });
        this.createNotify(`${response.result.name} created`, 'success');
      })
      .catch(fail => {
        this.createNotify(fail, 'error');
        console.log(fail);
      });
  }

  render = () => {
    const { formData } = this.state;
    const { title, properties, path } = this.state.model;
    const { classes } = this.props;

    return this.state.created ? (
      <Redirect to={ path } />
    ) : (
      <main className={ classes.content }>
        <div className={ classes.appBarSpacer } />

        <Typography variant="h4" gutterBottom component="h2">
          Create { title }
        </Typography>

        <Paper className={classes.root}>
          <form className={classes.tableWrapper} onSubmit={this.sendForm} method="post">
            {properties.map(property => (
              <Input
                error={ formData[property.id].error }
                key={ property.id + property.label }
                value={ formData[property.id].value }
                handleChange={ this.handleChange }
                togleChange={ this.togleSwitch }
                property={ property }
                propRelation={ property.type === 'Select' ? this.propRelation(property.id) : [] }
              />
            ))}

            <div className={ classes.buttonWrapper }>
              <Button type='submit' variant="contained" color="primary" className={ classes.button }>
                Create
              </Button>

              <Button variant="outlined" className={ classes.button } onClick={ this.clearForm }>
                Clear
              </Button>

              <Button variant="outlined" color="secondary" className={ classes.button } component={ this.cancelLink }>
                Cancel
              </Button>
            </div>
          </form>
        </Paper>
      </main>
    );
  };
}
export default Form;