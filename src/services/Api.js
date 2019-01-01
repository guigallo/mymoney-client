export default {
  getAccounts() {
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
      console.log(response);
      if(response.ok)
        return response.json();
    })
    .then(json => {
      console.log(json);
    })
  }
}