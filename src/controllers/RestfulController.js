import { getAll } from '../services/api';

export default class Controller {
  constructor(name, action) {
    this.name = name;
    this.action = action;

    this.relations = this.relations.bind(this);
  }

  list = () => dispatch =>
    getAll(this.name)
      .then(json => dispatch(this.action.list(json)))
      .catch(err => console.log(err));

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

  delete = id => dispatch => {
    console.log(id);
  }
}