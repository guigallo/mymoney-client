import connectFactory from './connectFactory';
import account from '../models/account';
import category from '../models/category';
import creditcard from '../models/creditcard';
import expense from '../models/expense';
import income from '../models/income';
import transfer from '../models/transfer';
import user from '../models/user';

// read files
const routes = [
  account,
  category,
  creditcard,
  expense,
  income,
  transfer,
  user
];
export const restRoutes = connectFactory(routes);
export const listMenu = category =>
  routes.filter(route => {
    if(! route.menu.enable) return false;

    return route.menu.category === category ? true : false;
  });

const getRestReducers = () => {
  let reducers = {};
  routes.forEach(route => {
    reducers[route.id] = route.getReducer();
  });
  return reducers;
}
export const restReducers = getRestReducers();