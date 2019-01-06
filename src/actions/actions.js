class Action {
  constructor(name, defaultSortBy = 'name') {
    this.name = name;
    this.defaultSortBy = defaultSortBy
  }

  list(list) {
    return { type: `LIST_${this.name}`, list, sort: 'desc', sortBy: this.defaultSortBy, key: new Date().getTime() }
  }
}

export const accountsActions = new Action('ACCOUNTS');
export const creditcardActions = new Action('CREDITCARDS');
export const usersActions = new Action('USERS');
export const expensesActions = new Action('EXPENSES', 'description');