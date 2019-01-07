import React from 'react';
import Typography from '@material-ui/core/Typography';
import Protected from '../services/Protected';
import TableCustom from '../components/TableCustom';

class View extends React.Component {
  state = { errors: '', authenticated: false };

  componentDidMount = () => 
    this.setState({ authenticated: Protected.isAuthenticated()},
      () => this.props.List() );
  
  render = () => {
    const { classes, list } = this.props;
    const { name, columns } = this;

    return this.state.authenticated && (
      <main className={ classes.content }>
        <div className={ classes.appBarSpacer } />

        <Typography variant="h4" gutterBottom component="h2">
          { name }
        </Typography>

        <TableCustom
          key={ list || 'empty' }
          columns={ columns }
          rows={ list || [] }
          rowsPerPage={ 5 }
        />
      </main>
    )
  }
}

export default View;