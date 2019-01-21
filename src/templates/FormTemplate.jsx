import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import FormController from '../controllers/FormController';
import { getById } from '../services/api';

class FormTemplate extends React.Component {
  constructor(middleware) {
    super(middleware.props);

    this.config = middleware.config;
    this.model = middleware.model;

    this.state = {
      status: 'loading',
      ...this.propertiesToFields(middleware.model.properties),
    };
  };

  createNotify = (message, variant) => this.props.Notify({ message, options: { variant } });

  componentDidMount = () => {
    if(this.config.type === 'Edit') {
      getById(this.model.path, this.props.match.params.id)
        .then(response => {
          const result = response.result;
          let fields = this.state.fields;
          for(let prop in result)
            fields.hasOwnProperty(prop) ?
              fields[prop].value = result[prop] :
              fields[prop] = result[prop];
          
          this.setState({ status: 'editing', fields });
        })
        .catch(() => {
          this.createNotify(`${this.model.title} not found.`, 'error');
          this.setState({ status: 'notFound' });
        })
    }
    if(this.config.type === 'Create') this.setState({ status: 'creating' })
    this.props.Relations(this.props.relations);
  }
  
  propertiesToFields(properties) {
    let fields = {};
    let obj = {};
    properties.forEach(property => {
      fields[property.id] = {
        value: '',
        required: property.required,
        error: {
          hasError: false,
          message: '',
        },
      };
    });
    return { fields, obj };
  }

  render = () => {
    const { title, properties, path } = this.model;
    const { status, fields } = this.state;
    const { relationsData } = this.props;
    const { type, actionForm } = this.config;

    if(status === 'notFound')
      return <Redirect to={ path } />

    if(status === 'loading' || relationsData === undefined)
      return <Loading/>
    
    return (
      <FormController
        title={ title }
        formType={ type }
        actionForm={ actionForm }
        fields={ fields }
        properties={ properties }
        path={ path }
        relationsData={ relationsData }
        createNotify ={ this.createNotify }
      />
    )
  };
}

export default FormTemplate;