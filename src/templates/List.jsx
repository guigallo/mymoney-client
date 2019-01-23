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
      ...this.propertiesToState(middleware.model.properties)
    };
    this.classes = middleware.props.classes;
    this.model = middleware.model;
  };
  
  propertiesToState(properties) {
    let newState = {}
    properties.forEach(property => {
      newState[property.id] = '';
    });
    return newState;
  }

  componentDidMount = () => this.props.List().catch(err => console.log(err));
  createLink = props => <Link to={`${this.model.path}/create`} {...props} />

  shouldComponentUpdate(nextProps) {
    if (this.props.list !== nextProps.list)
      return true;

    return false;
  }

  render = () => {
    const { title, properties, path } = this.model;
    const { classes } = this;
    const { list, Notify, Delete, /*expiredSession*/ } = this.props;
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

        <Table
          path={ path }
          title={ title }
          key={ key }
          columns={ properties }
          rows={ rows }
          rowsPerPage={ 5 }
          Notify={ Notify }
          Delete={ Delete }
        />
      </main>
    );
  };
}

export default List;