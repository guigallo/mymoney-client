import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { show } from '../utils/propertyType';
import Form from '../components/Form';

class FormController extends React.Component {
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

    this.handleChange = this.handleChange.bind(this);
    this.propRelation = this.propRelation.bind(this);
    this.sendForm = this.sendForm.bind(this);
  };

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
        prop.error = {
          hasError: true,
          message: 'Required'
        };
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
        fields[data].error = {
          hasError: false,
          message: ''
        };
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
    const { properties, formType, title, path } = this;
    
    return (
      <Form
        formType={ formType }
        title={ title }
        path={ path }
        fields={ fields }
        properties={ properties }

        sendForm={ this.sendForm }
        handleChange={ this.handleChange }
        propRelation={ this.propRelation }
        clearForm={ this.clearForm }
      />
    )
  };
}

FormController.propTypes = {
  actionForm: PropTypes.func.isRequired,
  createNotify: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  formType: PropTypes.oneOf(['Create', 'Edit']).isRequired,
  path: PropTypes.string.isRequired,
  properties: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.any.isRequired,
    sum: PropTypes.bool.isRequired,
    align: PropTypes.oneOf(['left', 'right']).isRequired,
    required: PropTypes.bool.isRequired,
    show: PropTypes.string.isRequired,
  })).isRequired,
  relationsData: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
}

export default FormController;