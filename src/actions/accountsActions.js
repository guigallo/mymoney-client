export const listAccounts = (list) => {
  return { type: 'LIST', list, sort: 'asc', sortBy: 'name', key: new Date().getTime() }
}

export const sort = (accounts, sort, sortBy) => (
  { type: 'SORT', accounts, sort, sortBy }
)