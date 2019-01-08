class Action {
  constructor(name) { this.name = name }

  list = (list) =>{ console.log(list); return ({ type: `LIST_${this.name}`, list, key: new Date().getTime(), teste:'asdfasd' })}
}

export const accountsActions = new Action('ACCOUNTS');
export const creditcardActions = new Action('CREDITCARDS');
export const usersActions = new Action('USERS');
export const expensesActions = new Action('EXPENSES');
export const incomesActions = new Action('INCOMES');
export const transfersActions = new Action('TRANSFERS');
export const categoriesActions = new Action('CATEGORIES');