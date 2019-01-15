import { createProperty } from '../utils/propertyType';
import { category, icon } from '../utils/Menu';
import Model from './Model';

const id = 'categories';
const title = 'Categories';
const properties = [
  //             id      label   type    sum    align   req    show
  createProperty('name', 'Name', String, false, 'left', true),
];
const menu = {
  enable: true,
  visible: true,
  category: category.configs,
  icon: icon.category
};

export default new Model(id, title, properties, menu);