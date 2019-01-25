export default class Action {
  constructor(name) { this.name = name.toUpperCase() };
  list = (list) => ({ type: `LIST_${this.name}`, list });
  relations = relationsData => ({ type: `RELATIONS_${this.name}`, relationsData });
  deleteObj = (deleteId) => ({ type: `DELETE_${this.name}`, deleteId });
}