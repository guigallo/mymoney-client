import Form from '../components/Form';

import { withStyles } from '@material-ui/core/styles';
import styles from '../styles/form';

const account = {
  title: 'Account',
  path: '/Account',
  properties: [
    { id: 'name',     label: 'Name',    placeholder: 'Name',    type: 'text', },
    { id: 'balance',  label: 'Balance', placeholder: 'Balance', type: 'number', },
  ]
};
const income = {
  title: 'Income',
  path: '/income',
  properties: [
    { id: 'paid',         label: 'Paid',        placeholder: 'Paid',        type: Boolean },
    { id: 'date',         label: 'Date',        placeholder: 'Date',        type: Date },
    { id: 'description',  label: 'Description', placeholder: 'Description', type: String },
    { id: 'Account',      label: 'Account',     placeholder: 'Account',     type: String },
    { id: 'category',     label: 'Category',    placeholder: 'Category',    type: String },
    { id: 'value',        label: 'Value',       placeholder: 'Value',       type: Number },
  ]
};
const expense = {
  title: 'Expense',
  path: '/expense',
  properties: [
    { id: 'paid',         label: 'Paid',        placeholder: 'Paid',        type: Boolean },
    { id: 'date',         label: 'Date',        placeholder: 'Date',        type: Date },
    { id: 'description',  label: 'Description', placeholder: 'Description', type: String },
    { id: 'Account',      label: 'Account',     placeholder: 'Account',     type: String },
    { id: 'category',     label: 'Category',    placeholder: 'Category',    type: String },
    { id: 'value',        label: 'Value',       placeholder: 'Value',       type: Number },
  ]
};
const transfer = {
  title: 'Transfer',
  path: '/transfer',
  properties: [
    { id: 'accountOut', label: 'Account Out', placeholder: 'Account Out', type: String },
    { id: 'accountIn',  label: 'Account In',  placeholder: 'Account In',  type: String },
    { id: 'date',       label: 'Date',        placeholder: 'Date',        type: Date },
    { id: 'value',      label: 'Value',       placeholder: 'Value',       type: Number },
  ]
};
const creditcard = {
  title: 'Credit card',
  path: '/creditcard',
  properties: [
    { id: 'name',       label: 'Name',        placeholder: 'Name',        type: String },
    { id: 'limit',      label: 'Limit',       placeholder: 'Limit',       type: Number },
    { id: 'closingDay', label: 'Closing day', placeholder: 'Closing day', type: String },
    { id: 'dueDate',    label: 'Due date',    placeholder: 'Due date',    type: String },
    { id: 'account',    label: 'Account',     placeholder: 'Account',     type: String },
  ]
};
const category = {
  title: 'Category',
  path: '/category',
  properties: [
    { id: 'name', label: 'Name', placeholder: 'Name', type: String },
  ]
};
const user = {
  title: 'User',
  path: '/user',
  properties: [
    { id: 'name',   label: 'Name',   placeholder: 'Name',   type: String, },
    { id: 'email',  label: 'Email',  placeholder: 'Email',  type: 'email', },
    { id: 'password',  label: 'Password',  placeholder: 'Password',  type: 'password', },
  ]
};

const exportFactory = (route) => 
  withStyles(styles)((props) => new Form({ props, route }));

export default {
  account: exportFactory(account),
  income: exportFactory(income),
  expense: exportFactory(expense),
  transfer: exportFactory(transfer),
  creditcard: exportFactory(creditcard),
  category: exportFactory(category),
  user: exportFactory(user),
}