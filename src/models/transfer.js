import { createProperty } from '../utils/propertyType';
import { category, icon } from '../utils/Menu';
import Model from './Model';

const id = 'transfers';
const title = 'Transfers';
const properties = [
  createProperty('accountOut',  'Account Out',  'Select', false,  'left'),
  createProperty('accountIn',   'Account In',   'Select', false,  'left'),
  createProperty('date',        'Date',         Date,     false,  'left'),
  createProperty('value',       'Value',        'Money',  true,   'right'),
];
const menu = {
  enable: true,
  visible: true,
  category: category.transactions,
  icon: icon.compare
};
const relations = ['accounts'];

export default new Model(id, title, properties, menu, relations);