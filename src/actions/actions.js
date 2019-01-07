class Action {
  constructor(name) { this.name = name }

  list = (list) => ({ type: `LIST_${this.name}`, list, key: new Date().getTime() })
}

export const accountsActions = new Action('ACCOUNTS');
export const creditcardActions = new Action('CREDITCARDS');
export const usersActions = new Action('USERS');
export const expensesActions = new Action('EXPENSES');