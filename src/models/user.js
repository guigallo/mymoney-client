import { createProperty, show } from '../utils/propertyType';
import { category, icon } from '../utils/Menu';
import Model from './Model';

const friendly = (value) => permissionsFriendly(value);
const permissionsFriendly = (permissions) => {
  let arrFriendly = {};
  permissions.forEach(permission => {
    const divider = permission.indexOf(':');
    const route = permission.substr(0, divider);
    const level = permission.substr(divider + 1, 1).toUpperCase();

    if(arrFriendly.hasOwnProperty(route)) 
      arrFriendly[route] += level;
    else
      arrFriendly[route] = level;
  });

  let str = '';
  for(let propertyName in arrFriendly)
    str += `${propertyName} ${arrFriendly[propertyName]} | `;

  return str.substr(0, str.length -3);
}

const id = 'users';
const title = 'Users';
const properties = [
  //             id             label           type        sum     align    req    show
  createProperty('name',        'Name',         String,     false,  'left',  true),
  createProperty('email',       'Email',        'email',    false,  'left',  true),
  createProperty('password',    'Password',     'password', false,  'left',  true,  show.form),
  createProperty('permissions', 'Permissions',  friendly,   false,  'left',  false, show.list),
];
const menu = {
  enable: true,
  visible: true,
  category: category.configs,
  icon: icon.people
};

export default new Model(id, title, properties, menu);