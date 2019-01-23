import { List } from 'immutable';
import { enqueueSnackbar } from '../actions/notification.actions';

export function reducer(name, state, action) {
  if(state === undefined) state = [];

  switch (action.type) {
    case `LIST_${name}`: return { list: new List(action.list) }
    case `RELATIONS_${name}`: return { relationsData: action.relationsData };
    case `DELETE_${name}`: return { deleteId: action.deleteId };
    default: return state;
  }
}

export const dispatchProps = (store, Controller, relations = []) => {
  const mapStateToProps = state => ({
    list: state[store].list,
    relations,
    relationsData: state[store].relationsData,
    deleteId: state[store].deleteId,
  });
  
  const mapDispatchToProps = dispatch => ({
    List: () => dispatch(Controller.list()),
    Relations: relations => dispatch(Controller.relations(relations)),
    Notify: snackbar => dispatch(enqueueSnackbar(snackbar)),
    Delete: id => dispatch(Controller.delete(id)),
  });

  return [
    mapStateToProps,
    mapDispatchToProps
  ];
}