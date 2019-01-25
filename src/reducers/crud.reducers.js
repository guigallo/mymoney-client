import { getAll, deleteById } from '../services/api';
import { List } from 'immutable';
import { enqueueSnackbar } from '../actions/notification.actions';

export function reducer(state, action) {
  const {route, id} = state;
  console.log(state, action)
  console.log(route.toUpperCase(), id)
  switch (action.type) {
    case `DELETE_${route.toUpperCase()}`:
      console.log('delete no reducer');

      deleteById(route, id)
      .then(resolve => {
        console.log(resolve);
        //reload list
      })
      .catch(err => {
        console.log(err)
      });

      return { deleteId: id };
    default: return state;
  }
}