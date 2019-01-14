import React from 'react';
import { Link } from 'react-router-dom'
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
      ...this.propertiesToState(middleware.model.properties)
    };

    this.handleChange = this.handleChange.bind(this);
    this.propRelation = this.propRelation.bind(this);
    this.sendForm = this.sendForm.bind(this);
  };
  
  propertiesToState(properties) {
    let newState = {}
    properties.forEach(property => {
      newState[property.id] = '';
    });
    return newState;
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
    
    this.setState({ [name]: value });
  }

  clearForm = () => {
    const properties = this.state.model.properties;
    let clearProperties = {};
    properties.forEach(property => 
      clearProperties[property.id] = ''
    );
    this.setState({ ...clearProperties });
  }

  cancelLink = props =>
    <Link to={`${this.state.model.path}`} {...props} />

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

  sendForm = event => {
    event.preventDefault();
    const { properties } = this.state.model

    let body = {}
    properties.forEach(prop => {
      if(prop.show === show.all || prop.show === show.form)
        body[prop.id] = this.state[prop.id];
    });
    const route = this.state.model.path;

    post(route, body)
      .then(response => {
        if(response.errors.length > 0) {
          response.errors.forEach(error => 
            this.props.Notify({
              message: error.msg,
              options: {
                  variant: 'error',
              }})
          );
        }
      })
      .catch(fail => console.log(fail));
  }

  render = () => {
    const { title, properties } = this.state.model;
    const { classes } = this.props;

    return (
      <main className={ classes.content }>
        <div className={ classes.appBarSpacer } />

        <Typography variant="h4" gutterBottom component="h2">
          Create { title }
        </Typography>

        <Paper className={classes.root}>
          <form className={classes.tableWrapper} onSubmit={this.sendForm} method="post">
            {properties.map(property => (
              <Input
                key={ property.id + property.label }
                value={ this.state[property.id]}
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