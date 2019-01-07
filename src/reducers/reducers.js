import { List } from 'immutable';

function reducer(name, state, action) {
  switch (action.type) {
    case `LIST_${name}`:
      return {
        list: new List(action.list),
        order: 'none',
        orderBy: 'none',
        key: action.key
      }

    default:
      return state;
  }
}

export const accounts = (state = [], action) => reducer('ACCOUNTS', state, action);
export const creditcards = (state = [], action) => reducer('CREDITCARDS', state, action);
export const users = (state = [], action) => reducer('USERS', state, action);
export const expenses = (state = [], action) => reducer('EXPENSES', state, action);

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