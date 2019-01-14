import { createProperty } from '../utils/propertyType';
import { category, icon } from '../utils/Menu';
import Model from './Model';

const id = 'categories';
const title = 'Categories';
const properties = [
  createProperty('name', 'Name', String, false, 'left'),
];
const menu = {
  enable: true,
  visible: true,
  category: category.configs,
  icon: icon.category
};

export default new Model(id, title, properties, menu);