import React from 'react';
import Protected from '../services/Protected';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/content'
import Typography from '@material-ui/core/Typography';

import AccountsController from '../controllers/AccountsController';
import TableCustom from '../components/TableCustom';

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
    const { classes } = this.props;
    return this.state.authenticated ? (
      <main className={ classes.content }>
        <div className={ classes.appBarSpacer } />

        <Typography variant="h4" gutterBottom component="h2">
          Accounts
        </Typography>

        <TableCustom
          key={ this.props.accounts || 'accempty' }
          columns={[
            {name: 'Name', property: 'name',  sum: false, numeric: false },
            {name: 'Balance', property: 'value',  sum: true, numeric: true  },
            {name: 'Final monthly balance', property: 'monthlyExpected',  sum: false, numeric: true }
          ]}
          rows={ this.props.accounts || [] }
          order={ 'asc' }
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
    accounts: state.accounts.list,
    sort: state.accounts.sort,
    sortBy: state.accounts.sortBy
  }
} 

const mapDispatchToProps = dispatch => ({
  List: () => dispatch(AccountsController.list()),
  //Sort: (list, order, orderBy) => dispatch(AccountsController.sort(list, order, orderBy))
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Accounts));