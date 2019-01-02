export default {
  getAccounts() {
    return new Promise((resolve, reject) => {
      const auth = JSON.parse(localStorage.getItem('auth-token'));
      const headers = new Headers({ 'x-access-token': auth.token });
      const init = {
        method: 'GET',
        headers,
        mode: 'cors',
        cache: 'default'
      };
  
      fetch('http://localhost:3001/accounts', init)
        .then(response => {
          if(response.ok)
            return response.json();
    
          switch(response.status) {
            case 404: throw new Error('No accounts found');
            case 500: throw new Error('Fail to access server');
            default:  throw new Error('Fail to get accounts');
          }
        })
        .then(json => resolve(json.result))
        .catch(err => { reject(new Error(`Fail to get accounts. ${err}`)) });
    });
  }
}