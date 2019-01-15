import { createProperty } from '../utils/propertyType';
import { category, icon } from '../utils/Menu';
import Model from './Model';

const id = 'expenses';
const title = 'Expenses';
const properties = [
  //             id             label           type      sum     align     req    show
  createProperty('paid',        'Paid',         Boolean,  false,  'left',   true),
  createProperty('date',        'Date',         Date,     false,  'left',   true),
  createProperty('description', 'Description',  String,   false,  'left',   true),
  createProperty('account',     'Account',      'Select', false,  'left',   true),
  createProperty('category',    'Category',     'Select', false,  'left',   true),
  createProperty('value',       'Value',        'Money',  true,   'right',  true),
];
const menu = {
  enable: true,
  visible: true,
  category: category.transactions,
  icon: icon.moneyOff
};
const relations = ['accounts', 'categories'];

export default new Model(id, title, properties, menu, relations);