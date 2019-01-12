import { createProperty } from '../utils/propertyType';

export default {
  title: 'Category',
  path: '/categories',
  properties: [
    createProperty('name', 'Name', String, false, 'left'),
  ]
};