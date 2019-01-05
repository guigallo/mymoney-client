import { creditcardActions } from '../redux/actions';

export default class CreditcardsController {
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
  
      fetch('http://localhost:3001/creditcards', init)
        .then(response => {
          if(response.ok)
            return response.json();
    
          switch(response.status) {
            case 404: throw new Error('No creditcards found');
            case 500: throw new Error('Fail to access server');
            default:  throw new Error('Fail to get creditcards');
          }
        })
        .then(json => {
          dispatch(creditcardActions.list(json.result))
          return json.result;
        })
        .catch(err => new Error(`Fail to get creditcards. ${err}`));
    }
  }

  static sort(list, order, orderBy) {
    return dispatch => {
      dispatch([list, order, orderBy]);
    }
  }
}