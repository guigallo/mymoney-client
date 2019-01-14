import { getAll } from '../services/api';

export default class Controller {
  constructor(name, action) {
    this.name = name;
    this.action = action;
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
}