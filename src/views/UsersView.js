import React from 'react';
import Protected from '../services/Protected';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/content'
import Typography from '@material-ui/core/Typography';

import UsersController from '../controllers/UsersController';
import TableCustom from '../components/TableCustom';

class Users extends React.Component {
  state = {
    errors: '',
    authenticated: false
  }

  componentDidMount() {
    this.setState({ authenticated: Protected.isAuthenticated()}, () => {
      this.props.List();
    })
  }

  render = () => {
    const { classes } = this.props;
    return this.state.authenticated ? (
      <main className={ classes.content }>
        <div className={ classes.appBarSpacer } />

        <Typography variant="h4" gutterBottom component="h2">
          Users
        </Typography>

        <TableCustom
          key={ this.props.users || 'empty' }
          columns={[
            {name: 'Name', property: 'name',  sum: false, numeric: false },
            {name: 'Email', property: 'email',  sum: false, numeric: false  },
            {name: 'Permissions', property: 'permissions',  sum: false, numeric: false }
          ]}
          rows={ this.props.users || [] }
          order={ 'desc' }
          orderBy={ 'name' }
          rowsPerPage={ 5 }
        />
      </main>
    ) : (
      <p>not auth</p>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.users.list,
    sort: state.users.sort,
    sortBy: state.users.sortBy
  }
} 

const mapDispatchToProps = dispatch => ({
  List: () => dispatch(UsersController.list()),
  //Sort: (list, order, orderBy) => dispatch(AccountsController.sort(list, order, orderBy))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Users));