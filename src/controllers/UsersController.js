import { usersActions } from '../actions/actions';

export default class UsersController {
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
  
      fetch('http://localhost:3001/users', init)
        .then(response => {
          if(response.ok)
            return response.json();
    
          switch(response.status) {
            case 404: throw new Error('No users found');
            case 500: throw new Error('Fail to access server');
            default:  throw new Error('Fail to get users');
          }
        })
        .then(json => {
          dispatch(usersActions.list(json.result))
          return json.result;
        })
        .catch(err => new Error(`Fail to get users. ${err}`));
    }
  }
}