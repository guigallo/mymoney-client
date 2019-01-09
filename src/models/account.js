import createProperty from '../utils/createProperty';

export default {
  title: 'Account',
  path: '/account',
  properties: [
    createProperty('name',            'Name',                   String, false,  'left'),
    createProperty('value',           'Balance',                Number, true,   'right'),
    createProperty('monthlyExpected', 'Final monthly balance',  Number, false,  'right'),
  ]
};