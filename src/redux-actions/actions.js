class Action {
  constructor(name) {
    this.name = name;
  }

  list(list) {
    return { type: `LIST_${this.name}`, list, sort: 'desc', sortBy: 'name', key: new Date().getTime() }
  }
}

export const accountsActions = new Action('ACCOUNTS');
export const creditcardActions = new Action('CREDITCARDS');
export const usersActions = new Action('USERS');