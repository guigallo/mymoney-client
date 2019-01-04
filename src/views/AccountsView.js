import React from 'react';
import Protected from '../services/Protected';
import { connect } from 'react-redux';

import AccountsController from '../controllers/AccountsController';

import Layout from '../components/Layout';
import Table from '../components/Table';

class Accounts extends React.Component {
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
        name='Accounts'
        View={ Table }
        columns={[
          {name: 'Name', property: 'name',  sum: false, numeric: false },
          {name: 'Balance', property: 'value',  sum: true, numeric: true  },
          {name: 'Final monthly balance', property: 'monthlyExpected',  sum: false, numeric: true }
        ]}
        rows={ this.props.accounts }
        order={ 'desc' }
        orderBy={ 'name' }
      />
    ) : (
      <p>not auth</p>
    )
  }
}

const mapStateToProps = state => {
  return {
    accounts: state.accounts.list,
    sort: state.accounts.sort,
    sortBy: state.accounts.sortBy
  }
} 

const mapDispatchToProps = dispatch => ({
  List: () => dispatch(AccountsController.list()),
  Sort: (list, order, orderBy) => dispatch(AccountsController.sort(list, order, orderBy))
})

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);