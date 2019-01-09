import createProperty from '../utils/createProperty';

export default {
  title: 'Credit card',
  path: '/creditcard',
  properties: [
    createProperty('name',        'Name',         String, false,  'left'),
    createProperty('limit',       'Limit',        Number, true,   'right'),
    createProperty('closingDay',  'Closing day',  String, false,  'right'),
    createProperty('dueDate',     'Due date',     String, false,  'right'),
    createProperty('account',     'Account',      String, false,  'left'),
  ]
};