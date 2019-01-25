export default class Action {
  constructor(name) { this.name = name.toUpperCase() };
  list = (list) => ({ type: `LIST_${this.name}`, list });
  relations = relationsData => ({ type: `RELATIONS_${this.name}`, relationsData });
  deleteObj = (deleteId) => { console.log('delete na action'); return ({ type: `DELETE_${this.name}`, deleteId })};
}