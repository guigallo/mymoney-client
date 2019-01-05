import React from 'react';
import Protected from '../services/Protected';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/content'
import Typography from '@material-ui/core/Typography';

import CreditcardsController from '../controllers/CreditcardsController';
import TableCustom from '../components/TableCustom';

class Creditcards extends React.Component {
  state = {
    errors: '',
    authenticated: false
  }

  componentDidMount() {
    this.setState({
      authenticated: Protected.isAuthenticated()
    }, () => this.props.List())
  }
  
  render = () => {
    const { classes } = this.props;
    return this.state.authenticated ? (
      <main className={ classes.content }>
        <div className={ classes.appBarSpacer } />

        <Typography variant="h4" gutterBottom component="h2">
          Credit cards
        </Typography>

        <TableCustom
          key={ this.props.creditcards || 'empty' }
          columns={[
            {name: 'Name', property: 'name',  sum: false, numeric: false },
            {name: 'Limit', property: 'limit',  sum: true, numeric: true  },
            {name: 'Closing day', property: 'closingDay',  sum: false, numeric: true },
            {name: 'Due date', property: 'dueDate',  sum: false, numeric: true },
            {name: 'Account', property: 'account',  sum: false, numeric: false }
          ]}
          rows={ this.props.creditcards || [] }
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
    creditcards: state.creditcards.list,
    sort: state.creditcards.sort,
    sortBy: state.creditcards.sortBy
  }
} 

const mapDispatchToProps = dispatch => ({
  List: () => dispatch(CreditcardsController.list()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Creditcards));