import React from 'react';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Input from '../components/Input';

class Form extends React.Component {
  constructor(middleware) {
    super(middleware.props);
    this.state = {
      classes: middleware.props.classes,
      model: middleware.model,
      ...this.propertiesToState(middleware.model.properties)
    };

    this.handleChange = this.handleChange.bind(this);
  };
  
  propertiesToState(properties) {
    let newState = {}
    properties.forEach(property => {
      newState[property.id] = '';
    });
    return newState;
  }

  handleChange = name => event => 
    this.setState({ [name]: event.target.value });

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
          <form className={classes.tableWrapper}>
            {properties.map(property => (
              <Input
                key={ property.id }
                value={ this.state[property.id]}
                handleChange={ this.handleChange }
                property={ property }
              />
            ))}

            <div className={ classes.buttonWrapper }>
              <Button variant="contained" color="primary" className={ classes.button }>
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