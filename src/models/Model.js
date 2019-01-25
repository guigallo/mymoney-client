import Controller from '../controllers/RestfulController';
import { reducer } from '../reducers/rest.reducers';
import Action from '../actions/rest.actions'

const createController = id =>
  new Controller(id, new Action(id));

export default class Model {
  constructor(id, title, properties, menu = { enable: false }, relations = [], confirmDelete = [] ) {
    this.id = id;
    this.title = title;
    this.path = `/${id}`;
    this.controller = createController(id);
    this.properties = properties;
    this.menu = menu;
    this.relations = relations;
    this.confirmDelete = confirmDelete;
  }

  getReducer = () => (state, action) => reducer(this.id.toUpperCase(), state, action)
}