import React from 'react';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Loading from './Loading';
import Form from '../components/Form';

class Create extends React.Component {
  constructor(middleware) {
    super(middleware.props);
    this.config = middleware.config;

    this.state = {
      classes: middleware.props.classes,
      model: middleware.model,
      ...this.propertiesToFields(middleware.model.properties),
    };
  };

  createNotify = (message, variant) => this.props.Notify({ message, options: { variant } });

  componentDidMount = () => {
    switch(this.config.type) {
      case 'Edit':
        this.props.Edit(
          this.props.match.params.id,
          this.state.model.relations );
        break;
      case 'Create': this.props.Relations(this.props.relations); break;
      default: return null;
    }
  }
  
  propertiesToFields(properties) {
    let fields = {};
    properties.forEach(property => {
      fields[property.id] = {
        required: property.required,
        error: false,
      };
    });
    return { fields };
  }

  render = () => {
    if(this.props.obj === `${this.state.model.id} not found`) {
      this.createNotify(`${this.state.model.title} not found.`, 'error');
      return <Redirect to={ this.state.model.path } />
    }

    const { title, properties, path } = this.state.model;
    const { fields } = this.state;
    const { classes, obj, relationsData } = this.props;
    const { type, actionForm } = this.config;
    const id = obj === undefined ? 'Loading' : `Id: ${obj.result._id}`;

    return (
      <main className={ classes.content }>
        <div className={ classes.appBarSpacer } />

        <Typography variant="h4" gutterBottom component="h2">
          { `${this.type} ${title}` }
        </Typography>

        <Typography variant="caption" gutterBottom component="p">
          {id}
        </Typography>

        <Paper className={classes.root}>
          {obj === undefined ? (
            <Loading/>
          ) : (
            <Form
              type={ type }
              actionForm={ actionForm }
              obj={ obj }
              fields={ fields }
              properties={ properties }
              path={ path }
              relationsData={ relationsData }
            />
          )}
        </Paper>
      </main>
    )
  };
}
//export default withStyles(styles)(Edit);
export default Create;