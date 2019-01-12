import configs from '../configs/configs';

const PATH_API = configs.apiAdrres;

export const logIn = (email, password) =>
  new Promise((resolve, reject) => {
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: new Headers({'Content-Type': 'application/json'})
    }
  
    fetch(`${PATH_API}/log/in`, requestInfo)
      .then(response => {
        if(response.ok)
          return response.text();
        else 
          switch(response.status) {
            case 401: throw new Error('Invalid password');
            case 404: throw new Error('User not found');
            default: throw new Error('Impossible to log in');
          }
      })
      .then(token => resolve(token))
      .catch(error =>  reject(error.message));
  });

export const getAll = (route) =>
  new Promise((resolve, reject) => {
    const auth = JSON.parse(localStorage.getItem('auth-token'));
    const headers = new Headers({ 'x-access-token': auth.token, 'Content-Type': 'application/json' });
    const init = {
      method: 'GET',
      headers,
      mode: 'cors',
      cache: 'default'
    };

    fetch(`${PATH_API}/${route}`, init)
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
  
const createHeaders = (headersInit) => {
  let obj = {};
  headersInit.forEach(header => {
    if(header === 'json')
      obj['Content-Type'] = 'application/json';

    if(header === 'auth') {
      const auth = JSON.parse(localStorage.getItem('auth-token'))
      obj['x-access-token'] = auth.token;
    }
  });
  return new Headers(obj);
};

const createInit = (method, body, headersInit) => ({
  method,
  body: JSON.stringify(body),
  mode: 'cors',
  headers: createHeaders(headersInit)
});

export const post = (route, body) => {
  return new Promise(resolve => {
    const init = createInit('POST', body, ['json', 'auth']);
    
    fetch(`${PATH_API}${route}`, init)
      .then(response => {
        switch(response.status) {
          case 201:
          case 422:
            resolve(response.json());
            break;
          case 500: throw new Error('Fail to request');
          default: throw new Error('Impossible to request');
        }
      })
      .then(json => resolve(json))
  })
};