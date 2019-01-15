import { createProperty } from '../utils/propertyType';
import { category, icon } from '../utils/Menu';
import Model from './Model';

const id = 'transfers';
const title = 'Transfers';
const properties = [
  //             id             label           type      sum     align     req    show
  createProperty('accountOut',  'Account Out',  'Select', false,  'left',   true),
  createProperty('accountIn',   'Account In',   'Select', false,  'left',   true),
  createProperty('date',        'Date',         Date,     false,  'left',   true),
  createProperty('value',       'Value',        'Money',  true,   'right',  true),
];
const menu = {
  enable: true,
  visible: true,
  category: category.transactions,
  icon: icon.compare
};
const relations = ['accounts'];

export default new Model(id, title, properties, menu, relations);