import { createProperty, show } from '../utils/propertyType';
import { category, icon } from '../utils/Menu';
import Model from './Model';

const id = 'accounts';
const title = 'Accounts';
const properties = [
  //             id                 label                     type      sum     align     req     show
  createProperty('name',            'Name',                   String,   false,  'left',   true),
  createProperty('value',           'Balance',                'Money',  true,   'right',  false,  show.list),
  createProperty('value',           'Start value',            'Money',  true,   'right',  true,   show.form),
  //createProperty('monthlyExpected', 'Final monthly balance',  Number,   false,  'right',  false,  show.list),
];
const menu = {
  enable: true,
  visible: true,
  category: category.transactions,
  icon: icon.accountBalance
};

export default new Model(id, title, properties, menu);