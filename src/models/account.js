import { createProperty, show } from '../utils/propertyType';

export default {
  title: 'Account',
  path: '/account',
  properties: [
    createProperty('name',            'Name',                   String,   false,  'left'),
    createProperty('value',           'Balance',                'Money',  true,   'right', show.list),
    createProperty('value',           'Start value',            'Money',  true,   'right', show.form),
    createProperty('monthlyExpected', 'Final monthly balance',  Number,   false,  'right', show.list),
  ]
};