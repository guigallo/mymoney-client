import { expensesActions } from '../actions/actions';

export default class ExpensesController {
  static list() {
    return dispatch => {
      const auth = JSON.parse(localStorage.getItem('auth-token'));
      const headers = new Headers({ 'x-access-token': auth.token });
      const init = {
        method: 'GET',
        headers,
        mode: 'cors',
        cache: 'default'
      };
  
      fetch('http://localhost:3001/expenses', init)
        .then(response => {
          if(response.ok)
            return response.json();
    
          switch(response.status) {
            case 404: throw new Error('No expenses found');
            case 500: throw new Error('Fail to access server');
            default:  throw new Error('Fail to get expenses');
          }
        })
        .then(json => {
          dispatch(expensesActions.list(json.result))
          return json.result;
        })
        .catch(err => new Error(`Fail to get expenses. ${err}`));
    }
  }

  static sort(list, order, orderBy) {
    return dispatch => {
      dispatch([list, order, orderBy]);
    }
  }
}