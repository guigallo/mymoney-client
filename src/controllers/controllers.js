import { getAll } from '../services/api';
import {
  accountsActions,
  creditcardActions,
  expensesActions,
  usersActions
} from '../actions/actions';

class Controller {
  constructor(name, action) {
    this.name = name;
    this.action = action
  }

  list = () => dispatch => getAll(this.name).then(json => dispatch(this.action.list(json)));
}

export const AccountsController = new Controller('accounts', accountsActions);
export const CreditcardsController = new Controller('creditcards', creditcardActions);
export const ExpensesController = new Controller('expenses', expensesActions);
export const UsersController = new Controller('users', usersActions);