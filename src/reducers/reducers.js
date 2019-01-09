import { List } from 'immutable';

function reducer(name, state, action) {
  if(state === undefined)
    state = [];

  switch (action.type) {
    /*case 'LIST_USERS':
      let newList = action.list.map(user => {
        let newUser = { permFriendly: permissionsFriendly(user.permissions) };
        for(let propertyName in user)
          newUser[propertyName] = user[propertyName];

        return newUser;
      });
      return { list: new List(newList), key: action.key }*/

    case `LIST_${name}`: return { list: new List(action.list) }
    default: return state;
  }
}

export const accounts =     (state, action) => reducer('ACCOUNTS',     state, action);
export const creditcards =  (state, action) => reducer('CREDITCARDS',  state, action);
export const users =        (state, action) => reducer('USERS',        state, action);
export const expenses =     (state, action) => reducer('EXPENSES',     state, action);
export const incomes =      (state, action) => reducer('INCOMES',      state, action);
export const transfers =    (state, action) => reducer('TRANSFERS',    state, action);
export const categories =   (state, action) => reducer('CATEGORIES',   state, action);

export const dispatchProps = (store, Controller) => {
  const mapStateToProps = state => ({
    list: state[store].list,
    order: state[store].order,
    orderBy: state[store].orderBy
  });
  
  const mapDispatchToProps = dispatch => ({
    List: () => dispatch(Controller.list()),
  });

  return [
    mapStateToProps,
    mapDispatchToProps
  ];
}