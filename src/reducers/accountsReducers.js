import { List } from 'immutable';

export function accounts(state = [], action) {
  switch (action.type) {
    case 'LIST':
      const props = {
        list: new List(action.list),
        sort: 'asc',
        sortBy: 'name',
        key: action.key
      }
      return props

    case 'SORT':
      console.log('sort no reducer')
      console.lot(state)
      console.lot(action)
      break;

    default:
      return state
  }
}