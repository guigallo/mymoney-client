import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import List from '../templates/List';
import Form from '../templates/FormTemplate';
import stylesList from '../styles/list';
import { dispatchProps } from '../reducers/rest.reducers';

import { create, update } from '../services/api';

const exportFactory = (model, Component, styles, config = null) => 
  withStyles(styles)((props) => new Component({ props, model, styles, config }));

let restful = {}
export default (restfulRoutes) =>
  restfulRoutes.map(route =>
    restful[route.id] = {
      id: route.id,
      
      create: connect(
        ...dispatchProps(route.id, route.controller, route.relations)
      )(exportFactory(route, Form, null, {
        type: 'Create',
        actionForm: create,
      })),

      list: connect(
        ...dispatchProps(route.id, route.controller)
      )(exportFactory(route, List, stylesList)),
        
      edit: connect(
        ...dispatchProps(route.id, route.controller, route.relations)
      )(exportFactory(route, Form, null, {
        type: 'Edit',
        actionForm: update,
      }))
    }
  );