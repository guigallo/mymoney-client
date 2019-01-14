import { List } from 'immutable';

function reducer(name, state, action) {
  if(state === undefined)
    state = [];

  switch (action.type) {
    case `LIST_${name}`: return { list: new List(action.list) };

    case `RELATIONS_${name}`: return { relationsData: action.relations };
    
    case 'ENQUEUE_SNACKBAR': return { ...state, notifications: [ ...state.notifications, { ...action.notification } ] };
    case 'REMOVE_SNACKBAR': return { ...state, notifications: state.notifications.filter( notification => notification.key !== action.key) };

    default: return state;
  }
}

export const accounts =       (state, action) => reducer('ACCOUNTS',     state, action);
export const creditcards =    (state, action) => reducer('CREDITCARDS',  state, action);
export const users =          (state, action) => reducer('USERS',        state, action);
export const expenses =       (state, action) => reducer('EXPENSES',     state, action);
export const incomes =        (state, action) => reducer('INCOMES',      state, action);
export const transfers =      (state, action) => reducer('TRANSFERS',    state, action);
export const categories =     (state, action) => reducer('CATEGORIES',   state, action);
export const notifications =  (state, action) => reducer('SNACKBAR',     state, action);

export const dispatchProps = (store, Controller, relations = []) => {
  const mapStateToProps = state => ({
    list: state[store].list,
    order: state[store].order,
    orderBy: state[store].orderBy,
    relations: relations.map(relation => (
      relation
    )),
    relationsData: state[store].relationsData
  });
  
  const mapDispatchToProps = dispatch => ({
    List: () => dispatch(Controller.list()),
    Relations: relations => dispatch(Controller.relations(relations))
  });

  return [
    mapStateToProps,
    mapDispatchToProps
  ];
}