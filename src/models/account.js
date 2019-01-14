import { createProperty, show } from '../utils/propertyType';
import { category, icon } from '../utils/Menu';
import Model from './Model';

const id = 'accounts';
const title = 'Account';
const properties = [
  createProperty('name',            'Name',                   String,   false,  'left'),
  createProperty('value',           'Balance',                'Money',  true,   'right', show.list),
  createProperty('value',           'Start value',            'Money',  true,   'right', show.form),
  createProperty('monthlyExpected', 'Final monthly balance',  Number,   false,  'right', show.list),
];
const menu = {
  enable: true,
  visible: true,
  category: category.transactions,
  icon: icon.accountBalance
};

export default new Model(id, title, properties, menu);