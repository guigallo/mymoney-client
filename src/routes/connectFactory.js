import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import List from '../templates/List';
import Form from '../templates/Form';
import stylesForm from '../styles/form';
import stylesList from '../styles/list';
import { dispatchProps } from '../reducers/rest.reducers';

const exportFactory = (model, Component, styles) => 
  withStyles(styles)((props) => new Component({ props, model }));

let restful = {}
export default (restfulRoutes) =>
  restfulRoutes.map(route =>
    restful[route.id] = {
      id: route.id,
      create: connect(
        ...dispatchProps(route.id, route.controller, route.relations))(
          exportFactory(route, Form, stylesForm)),
      
      list: connect(
        ...dispatchProps(route.id, route.controller))(
          exportFactory(route, List, stylesList)),
    }
  );