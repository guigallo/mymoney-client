import { createProperty } from '../utils/propertyType';
import { category, icon } from '../utils/Menu';
import Model from './Model';

const id = 'creditcards';
const title = 'Credit cards';
const properties = [
  createProperty('name',        'Name',         String,   false,  'left'),
  createProperty('limit',       'Limit',        'Money',  true,   'right'),
  createProperty('closingDay',  'Closing day',  Number,   false,  'right'),
  createProperty('dueDate',     'Due date',     Number,   false,  'right'),
  createProperty('account',     'Account',      'Select', false,  'left'),
];
const menu = {
  enable: true,
  visible: true,
  category: category.configs,
  icon: icon.creditCard
};
const relations = ['accounts'];

export default new Model(id, title, properties, menu, relations);