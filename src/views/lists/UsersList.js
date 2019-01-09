import List from '../../components/List';
import { UsersController } from '../../controllers/controllers';
import { connect } from 'react-redux';
import { dispatchProps } from '../../reducers/reducers';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../styles/content'

const title = 'Users';

const friendly = (value) => permissionsFriendly(value)
const columns = [
  { name: 'Name',         property: 'name',         type: String,   sum: false, align: 'left' },
  { name: 'Email',        property: 'email',        type: String,   sum: false, align: 'left' },
  { name: 'Permissions',  property: 'permissions',  type: friendly, sum: false, align: 'left' }
];

class UsersList extends List {
  constructor(props) {
    super(props, title, columns);
  }
}

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

export default connect (
  ...dispatchProps(
    title.toLowerCase(),
    UsersController))(
  withStyles(styles)(UsersList)
);