import { List } from 'immutable';

function reducer(name, state, action) {
  switch (action.type) {
    case 'LIST_USERS':
      let newList = action.list.map(user => {
        let newUser = { permFriendly: permissionsFriendly(user.permissions) };
        for(let propertyName in user)
          newUser[propertyName] = user[propertyName];

        return newUser;
      });
      return { list: new List(newList), key: action.key }

    case `LIST_${name}`:
      return { list: new List(action.list), key: action.key }

    default:
      return state;
  }
}

const permissionsFriendly = (permissions) => {
  let arrFriendly = {};
  permissions.forEach(permission => {
    const divider = permission.indexOf(':');
    const route = permission.substr(0, divider);
    const level = permission.substr(divider + 1, 1).toUpperCase();

    if(arrFriendly.hasOwnProperty(route)) {
      arrFriendly[route] += level;
    } else {
      arrFriendly[route] = level;
    }
  });

  let str = '';
  for(let propertyName in arrFriendly)
    str += `${propertyName} ${arrFriendly[propertyName]} | `;

  return str.substr(0, str.length -3);
}

export const accounts = (state = [], action) => reducer('ACCOUNTS', state, action);
export const creditcards = (state = [], action) => reducer('CREDITCARDS', state, action);
export const users = (state = [], action) => reducer('USERS', state, action);
export const expenses = (state = [], action) => reducer('EXPENSES', state, action);
export const incomes = (state = [], action) => reducer('INCOMES', state, action);
export const transfers = (state = [], action) => reducer('TRANSFERS', state, action);
export const categories = (state = [], action) => reducer('CATEGORIES', state, action);

export const dispatchProps = (name, Controller) => {
  const mapStateToProps = state => ({
    list: state[name].list,
    order: state[name].order,
    orderBy: state[name].orderBy
  });
  
  const mapDispatchToProps = dispatch => ({
    List: () => dispatch(Controller.list()),
  });

  return [
    mapStateToProps,
    mapDispatchToProps
  ];
}