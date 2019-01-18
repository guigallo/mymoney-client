import React from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { update } from '../services/api';
import Loading from './Loading';
import Form from '../components/Form';

class Edit extends React.Component {
  constructor(middleware) {
    super(middleware.props);
    this.state = {
      classes: middleware.props.classes,
      model: middleware.model,
      formHasError: false,
      ...this.propertiesToFields(middleware.model.properties),
    };
  };

  componentDidMount = () =>
    this.props.Edit(
      this.props.match.params.id,
      this.state.model.relations
    );
  
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
    const { fields } = this.state;
    const { title, properties, path } = this.state.model;
    const { classes, obj, relationsData } = this.props;
    const id = obj === undefined ? 'Loading' : `Id: ${obj.result._id}`;

    return (
      <main className={ classes.content }>
        <div className={ classes.appBarSpacer } />

        <Typography variant="h4" gutterBottom component="h2">
          Edit { title }
        </Typography>

        <Typography variant="caption" gutterBottom component="p">
          {id}
        </Typography>

        <Paper className={classes.root}>
          {obj === undefined ? (
            <Loading/>
          ) : (
            <Form
              type="edit"
              actionForm={ update }
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
export default Edit;