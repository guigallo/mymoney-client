import { createProperty } from '../utils/propertyType';

export default {
  title: 'Category',
  path: '/category',
  properties: [
    createProperty('name', 'Name', String, false, 'left'),
  ]
};