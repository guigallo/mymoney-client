import { createProperty } from '../utils/propertyType';
import { category, icon } from '../utils/Menu';
import Model from './Model';

const id = 'expenses';
const title = 'Expense';
const properties = [
  createProperty('paid',        'Paid',         Boolean,  false,  'left'),
  createProperty('date',        'Date',         Date,     false,  'left'),
  createProperty('description', 'Description',  String,   false,  'left'),
  createProperty('account',     'Account',      'Select', false,  'left'),
  createProperty('category',    'Category',     'Select', false,  'left'),
  createProperty('value',       'Value',        'Money',  true,   'right'),
];
const menu = {
  enable: true,
  visible: true,
  category: category.transactions,
  icon: icon.moneyOff
};
const relations = ['accounts', 'categories'];

export default new Model(id, title, properties, menu, relations);