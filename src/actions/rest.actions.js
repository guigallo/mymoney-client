export default class Action {
  constructor(name) { this.name = name.toUpperCase() }

  list = (list) => ({
    type: `LIST_${this.name}`, list//, key: new Date().getTime()
  });
  
  relations = rel => ({
    type: `RELATIONS_${this.name}`, relations: rel
  });
}