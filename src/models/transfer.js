import { createProperty } from '../utils/propertyType';

export default {
  title: 'Transfer',
  path: '/transfer',
  properties: [
    createProperty('accountOut',  'Account Out',  'Select', false,  'left'),
    createProperty('accountIn',   'Account In',   'Select', false,  'left'),
    createProperty('date',        'Date',         Date,     false,  'left'),
    createProperty('value',       'Value',        'Money',  true,   'right'),
  ]
};