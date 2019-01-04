import React from 'react';
import Protected from '../services/Protected';
import { connect } from 'react-redux';

import UsersController from '../controllers/UsersController';

import Layout from '../components/Layout';
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
    return this.state.authenticated ? (
      <Layout
        key={ this.props.rows || 0 }
        name='Users'
        View={ TableCustom }
        columns={[
          {name: 'Name', property: 'name',  sum: false, numeric: false },
          {name: 'Email', property: 'email',  sum: false, numeric: false  },
          {name: 'Permissions', property: 'permissions',  sum: false, numeric: false }
        ]}
        rows={ this.props.users }
        order={ 'desc' }
        orderBy={ 'name' }
        rowsPerPage={ 5 }
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(Users);