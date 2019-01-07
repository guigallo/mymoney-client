export const getAll = (route) =>
  new Promise((resolve, reject) => {
    const auth = JSON.parse(localStorage.getItem('auth-token'));
    const headers = new Headers({ 'x-access-token': auth.token });
    const init = {
      method: 'GET',
      headers,
      mode: 'cors',
      cache: 'default'
    };

    fetch(`http://localhost:3001/${route}`, init)
      .then(response => {
        if(response.ok)
          return response.json();
  
        switch(response.status) {
          case 404: reject(`No ${route} found`); break;
          case 500: reject('Fail to access server'); break;
          default:  reject(`Fail to get ${route}`);
        }
      })
      .then(json => resolve(json.result))
      .catch(err => reject(`Fail to get ${route}. ${err}`));
  });
  
