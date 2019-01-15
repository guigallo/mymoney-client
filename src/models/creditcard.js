import { createProperty } from '../utils/propertyType';
import { category, icon } from '../utils/Menu';
import Model from './Model';

const id = 'creditcards';
const title = 'Credit cards';
const properties = [
  //             id             label           type      sum     align     req    show
  createProperty('name',        'Name',         String,   false,  'left',   true),
  createProperty('limit',       'Limit',        'Money',  true,   'right',  true),
  createProperty('closingDay',  'Closing day',  Number,   false,  'right',  true),
  createProperty('dueDate',     'Due date',     Number,   false,  'right',  true),
  createProperty('account',     'Account',      'Select', false,  'left',   true),
];
const menu = {
  enable: true,
  visible: true,
  category: category.configs,
  icon: icon.creditCard
};
const relations = ['accounts'];

export default new Model(id, title, properties, menu, relations);