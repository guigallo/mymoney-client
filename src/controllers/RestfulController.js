import { getAll, getById } from '../services/api';


const resolveRelations = (rels, callback) => {
  let promises = rels.map(rel => getAll(rel));
  Promise.all(promises)
    .then(datas => {
      let relates = datas.map((data, index) => {
        const store = rels[index];
        return({ [store]: data });
      });
      callback(relates);
    });
}

export default class Controller {
  constructor(name, action) {
    this.name = name;
    this.action = action;

    this.relations = this.relations.bind(this);
  }

  list = () => dispatch =>
    getAll(this.name)
      .then(json => dispatch(this.action.list(json)));

  relations = rels => dispatch => {
    let promises = rels.map(rel => getAll(rel));
    Promise.all(promises)
      .then(datas => {
        let relates = datas.map((data, index) => {
          const store = rels[index];
          return({ [store]: data });
        });
        dispatch(this.action.relations(relates))
      });
    }

  edit = (id, rel) => dispatch => {
    getById(this.name, id)
      .then(obj =>
        rel === undefined ? dispatch(this.action.edit(obj)) :
          resolveRelations(rel, relationsData => dispatch(this.action.edit(obj, relationsData)))
      )
      .catch(error => dispatch(this.action.edit(error)));
  }
}