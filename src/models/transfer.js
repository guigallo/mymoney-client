import { createProperty } from '../utils/propertyType';

export default {
  title: 'Transfer',
  path: '/transfer',
  properties: [
    createProperty('accountOut',  'Account Out',  String,   false,  'left'),
    createProperty('accountIn',   'Account In',   String,   false,  'left'),
    createProperty('date',        'Date',         Date,     false,  'left'),
    createProperty('value',       'Value',        'Money',  true,   'right'),
  ]
};