import React from 'react';
import Typography from '@material-ui/core/Typography';
import Protected from '../services/Protected';
import TableCustom from '../components/TableCustom';

class View extends React.Component {
  state = { errors: '', authenticated: false };

  componentDidMount = () => 
    this.setState({ authenticated: Protected.isAuthenticated()},
      () => this.props.List() );
  
  render = () => this.state.authenticated ? (
    <main className={ this.props.classes.content }>
      <div className={ this.props.classes.appBarSpacer } />

      <Typography variant="h4" gutterBottom component="h2">
        {this.name}
      </Typography>

      <TableCustom
        key={ this.props.list || 'empty' }
        columns={ this.columns }
        rows={ this.props.list || [] }
        rowsPerPage={ 5 }
      />
    </main>
  ) : (
    <p>not auth</p>
  );
}

export default View;