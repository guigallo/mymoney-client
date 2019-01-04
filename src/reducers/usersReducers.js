import { List } from 'immutable';

export default function users(state = [], action) {
  switch (action.type) {
    case 'LIST':
      const props = {
        list: new List(action.list),
        sort: 'asc',
        sortBy: 'name',
        key: action.key
      }
      return props

    default:
      return state
  }
}