import List from '../templates/List';
import Form from '../templates/Form';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import stylesForm from '../styles/form';
import stylesList from '../styles/list';
import { dispatchProps } from '../reducers/reducers';

const exportFactory = (model, Component, styles) => 
  withStyles(styles)((props) => new Component({ props, model }));

let restful = {}
export default (restfulRoutes) =>
  restfulRoutes.map(route =>
    restful[route.id] = {
      id: route.id,
      create: exportFactory(route.model, Form, stylesForm),
      list: connect(
        ...dispatchProps(route.store, route.Controller))(
          exportFactory(route.model, List, stylesList)),
    }
  );