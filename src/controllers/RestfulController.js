import { getAll, deleteById } from '../services/api';

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
    const promises = [deleteById(this.name, id), getAll(this.name)];
    Promise.all(promises)
      .then(datas => {
        dispatch(this.action.list(datas[1]))
      })
      .catch(err => {
        console.log(err)
      });
  }
}