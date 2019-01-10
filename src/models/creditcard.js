import { createProperty } from '../utils/propertyType';

export default {
  title: 'Credit card',
  path: '/creditcard',
  properties: [
    createProperty('name',        'Name',         String,   false,  'left'),
    createProperty('limit',       'Limit',        'Money',  true,   'right'),
    createProperty('closingDay',  'Closing day',  Number,   false,  'right'),
    createProperty('dueDate',     'Due date',     Number,   false,  'right'),
    createProperty('account',     'Account',      String,   false,  'left'),
  ]
};