
import React from 'react';
import { withReducer } from 'recompose';
//import { deleteObj } from '../actions/crud.actions';
import { reducer } from '../reducers/crud.reducers';

let state = {
  route: 'incomes',
  id: '5c4929f9f13b4826af60ea17'
}
const enhance = withReducer('state', 'dispatch', reducer, state)

const Counter = enhance(({ state, dispatch }) =>
  <div>
    Count: {state.id}
    <button onClick={() => dispatch({type: 'DELETE_INCOMES'})}>Increment</button>
  </div>
)

export default Counter;