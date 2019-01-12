import { getAll } from '../services/api';
import {
  accountsActions,
  creditcardActions,
  expensesActions,
  incomesActions,
  usersActions,
  transfersActions,
  categoriesActions
} from '../actions/rest.actions';

class Controller {
  constructor(name, action) {
    this.name = name;
    this.action = action;
  }

  list = () => dispatch =>
    getAll(this.name)
      .then(json => dispatch(this.action.list(json)));

  relations = rels => dispatch => {
    let promises = rels.map(rel => getAll(rel));
    Promise.all(promises)
      .then(datas => {
        let relates = datas.map((data, index) => {
          const store = rels[index];
          return({ [store]: data });
        });

        dispatch(this.action.relations(relates))
      });
    }
}

export default {
  Accounts: new Controller('accounts', accountsActions),
  Creditcards: new Controller('creditcards', creditcardActions),
  Expenses: new Controller('expenses', expensesActions),
  Incomes: new Controller('incomes', incomesActions),
  Users: new Controller('users', usersActions),
  Transfers: new Controller('transfers', transfersActions),
  Categories: new Controller('categories', categoriesActions),
}