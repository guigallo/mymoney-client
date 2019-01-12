import { createProperty } from '../utils/propertyType';

export default {
  title: 'Income',
  path: '/incomes',
  properties: [
    createProperty('paid',        'Paid',         Boolean,  false,  'left'),
    createProperty('date',        'Date',         Date,     false,  'left'),
    createProperty('description', 'Description',  String,   false,  'left'),
    createProperty('account',     'Account',      'Select', false,  'left'),
    createProperty('category',    'Category',     'Select', false,  'left'),
    createProperty('value',       'Value',        'Money',  true,   'right'),
  ]
};