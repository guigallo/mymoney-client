import { List } from 'immutable';
import { enqueueSnackbar } from '../actions/notification.actions';

export function reducer(name, state, action) {
  if(state === undefined) state = [];

  switch (action.type) {
    case `LIST_${name}`: return { list: new List(action.list) };
    case `RELATIONS_${name}`: return { relationsData: action.relationsData };
    case `EDIT_${name}`: return { obj: action.obj, relationsData: action.relationsData };
    default: return state;
  }
}

export const dispatchProps = (store, Controller, relations = []) => {
  const mapStateToProps = state => ({
    obj: state[store].obj,
    list: state[store].list,
    order: state[store].order,
    orderBy: state[store].orderBy,
    relations,
    relationsData: state[store].relationsData
  });
  
  const mapDispatchToProps = dispatch => ({
    List: () => dispatch(Controller.list()),
    Relations: relations => dispatch(Controller.relations(relations)),
    Edit: (id, relations) => dispatch(Controller.edit(id, relations)),
    Notify: snackbar => dispatch(enqueueSnackbar(snackbar))
  });

  return [
    mapStateToProps,
    mapDispatchToProps
  ];
}