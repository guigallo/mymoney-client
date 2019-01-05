import { List } from 'immutable';

function reducer(name, state, action) {

  switch (action.type) {
    case `LIST_${name}`:
      return {
        list: new List(action.list),
        sort: 'asc',
        sortBy: 'name',
        key: action.key
      }

    default:
      return state;
  }
}

export const accounts = (state = [], action) => reducer('ACCOUNTS', state, action);
export const creditcards = (state = [], action) => reducer('CREDITCARDS', state, action);
export const users = (state = [], action) => reducer('USERS', state, action);