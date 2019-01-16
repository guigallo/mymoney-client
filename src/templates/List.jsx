import React from 'react';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Table from '../components/Table';

class List extends React.Component {
  constructor(middleware) {
    super(middleware.props);
    this.state = {
      classes: middleware.props.classes,
      model: middleware.model,
      ...this.propertiesToState(middleware.model.properties)
    };
  };
  
  propertiesToState(properties) {
    let newState = {}
    properties.forEach(property => {
      newState[property.id] = '';
    });
    return newState;
  }

  componentDidMount = () => this.props.List();
  createLink = props => <Link to={`${this.state.model.path}/create`} {...props} />
  
  render = () => {
    const { title, properties } = this.state.model;
    const { list, classes } = this.props;
    const key = list !== undefined ? list : `empty${title}`;
    const rows = list !== undefined ? list : [];
    
    return (
      <main className={ classes.content }>
        <div className={ classes.appBarSpacer } />

        <div className={ classes.titleContainer }>
          <Typography variant="h4" gutterBottom component="h2" className={ classes.title }>
            { title }
          </Typography>
          
          <Fab component={this.createLink}
               aria-label="Create"
               color='primary'
               variant="extended"
               className={ classes.create }>
            <AddIcon className={ classes.extendedIcon } />
            Create
          </Fab>
        </div>

        <Table key={ key }
               columns={ properties }
               rows={ rows }
               rowsPerPage={ 5 }
        />
      </main>
    );
  };
}

export default List;