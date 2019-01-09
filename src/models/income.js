import createProperty from '../utils/createProperty';

export default {
  title: 'Income',
  path: '/income',
  properties: [
    createProperty('paid',        'Paid',         Boolean,  false,  'left'),
    createProperty('date',        'Date',         Date,     false,  'left'),
    createProperty('description', 'Description',  String,   false,  'left'),
    createProperty('account',     'Account',      String,   false,  'left'),
    createProperty('category',    'Category',     String,   false,  'left'),
    createProperty('value',       'Value',        Number,   true,   'right'),
  ]
};