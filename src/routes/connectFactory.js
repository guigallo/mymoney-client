import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles'; // tirar daqui

import List from '../templates/List';
import Form from '../templates/Form';
import Edit from '../templates/Edit';
import stylesForm from '../styles/form'; // tirar daqui
import stylesList from '../styles/list'; // tirar daqui
import { dispatchProps } from '../reducers/rest.reducers';

const exportFactory = (model, Component, styles, action = null) => 
  withStyles(styles)((props) => new Component({ props, model, styles, action }));

let restful = {}
export default (restfulRoutes) =>
  restfulRoutes.map(route =>
    restful[route.id] = {
      id: route.id,
      create: connect(
        ...dispatchProps(route.id, route.controller, route.relations)
      )(exportFactory(route, Form, stylesForm, 'create')),
      
      list: connect(
        ...dispatchProps(route.id, route.controller)
      )(exportFactory(route, List, stylesList)),
        
      edit: connect(
        ...dispatchProps(route.id, route.controller, route.relations)
      )(exportFactory(route, Edit, stylesForm))
    }
  );