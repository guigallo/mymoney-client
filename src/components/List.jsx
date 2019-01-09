import React from 'react';
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography';
import TableCustom from '../components/TableCustom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

class View extends React.Component {
  constructor(props, title, path, columns) {
    super(props);
    this.state = {
      //authenticated: false,
      title,
      path,
      columns
    }
  };

  componentDidMount = () => this.props.List();

  createLink = props => <Link to={`${this.state.path}/create`} {...props} />
  
  render = () => {
    const { title, columns } = this.state;
    const { list, classes } = this.props;
    const key = list !== undefined ? list : `empty${this.title}`;
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

        <TableCustom key={ key }
                     columns={ columns }
                     rows={ rows }
                     rowsPerPage={ 5 }
        />
      </main>
    );
  };
}

export default View;