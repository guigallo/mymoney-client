import createProperty from '../utils/createProperty';

export default {
  title: 'Category',
  path: '/category',
  properties: [
    createProperty('name', 'Name', String, false, 'left'),
  ]
};